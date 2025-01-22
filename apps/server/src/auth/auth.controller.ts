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
import { Request as ExpressRequest } from 'express';
import { AuthService, UserTokenPayload } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignupDto } from './auth.dto';
import { UserEntity } from '../users/user.dto';
import { SessionGuard } from './guards/session.guard';
// import { TokenInterceptor } from './interceptors/token.interceptor';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseInterceptors(TokenInterceptor)
  @Post('signup')
  async signup(@Body() body: SignupDto, @Request() req: ExpressRequest) {
    const singupRes = await this.authService.signup(body);
    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
    return { ...singupRes, user: new UserEntity(singupRes.user) };
  }

  // @UseInterceptors(TokenInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest & { user: UserTokenPayload }) {
    const loginRes = await this.authService.login(req.user);
    return { ...loginRes, user: new UserEntity(loginRes.user) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: ExpressRequest & { user: UserTokenPayload }) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
    return this.authService.logout(req.user);
  }

  // @UseInterceptors(TokenInterceptor)
  @UseGuards(SessionGuard, JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req: ExpressRequest & { user: UserTokenPayload }
  ) {
    const profile = await this.authService.getProfile(req.user);
    return { ...profile, user: new UserEntity(profile.user) };
  }
}
