import {
  Controller,
  Post,
  Request,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService, UserTokenPayload } from './auth.service';
import { FastifyRequest } from 'fastify';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: FastifyRequest & { user: UserTokenPayload }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: FastifyRequest & { user: UserTokenPayload }) {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: FastifyRequest & { user: UserTokenPayload }) {
    return this.authService.getProfile(req.user);
  }
}
