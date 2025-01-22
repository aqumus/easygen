import {
  Controller,
  Post,
  Request,
  Get,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService, UserTokenPayload } from './auth.service';
import { FastifyRequest } from 'fastify';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignupDto } from './auth.dto';
import { UserEntity } from '../users/user.dto';

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
    req.session.destroy();
    return this.authService.logout(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: FastifyRequest & { user: UserTokenPayload }) {
    return new UserEntity(req.user);
  }
}
