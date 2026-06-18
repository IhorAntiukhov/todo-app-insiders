import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import type { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import type RequestWithUser from "src/common/types/requestWithUser.type";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(body, response);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() request: RequestWithUser) {
    return request.user;
  }
}
