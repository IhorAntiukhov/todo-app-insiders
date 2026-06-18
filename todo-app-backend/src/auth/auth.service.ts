import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/signUp.dto";
import { hash, verify } from "argon2";
import { SignInDto } from "./dto/signIn.dto";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import isDevEnv from "src/common/utils/isDevEnv.util";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({ name, email, password }: SignUpDto) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException("A user with this email already exists");
    }

    const passwordHash = await hash(password);

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }

  async signIn({ email, password }: SignInDto, response: Response) {
    console.log(email, password);
    const existingUser = await this.findUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundException("A user was not found");
    }

    const isPasswordValid = await verify(existingUser.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      existingUser.id,
      existingUser.email,
    );

    response.cookie("access_token", accessToken, this.getCookieOptions(true));
    response.cookie(
      "refresh_token",
      refreshToken,
      this.getCookieOptions(false),
    );
  }

  private async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  private async generateTokens(id: string, email: string) {
    const payload = {
      id,
      email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: "15m",
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: "7d",
      }),
    };
  }

  private getCookieOptions(isAccessToken: boolean) {
    return {
      httpOnly: true,
      secure: !isDevEnv(this.configService),
      sameSite: "lax",
      maxAge: isAccessToken
        ? this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE")
        : this.configService.getOrThrow<number>("REFRESH_TOKEN_MAX_AGE"),
    } as const;
  }
}
