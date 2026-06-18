import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtToken } from "../types/token.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: JwtToken) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!existingUser) {
      throw new UnauthorizedException("User was not found");
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
    };
  }
}
