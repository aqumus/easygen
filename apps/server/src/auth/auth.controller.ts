import {
  Controller,
  Post,
  Request,
  Get,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Response,
} from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { AuthService, UserTokenPayload } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignupDto } from './auth.dto';
import { UserEntity } from '../users/user.dto';
import { authCookieName } from './constants';
import { TokenInterceptor } from './interceptors/token.interceptor';
// import { SessionGuard } from './guards/session.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(TokenInterceptor)
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const singupRes = await this.authService.signup(body);
    return { ...singupRes, user: new UserEntity(singupRes.user) };
  }

  @UseInterceptors(TokenInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest & { user: UserTokenPayload }) {
    const loginRes = await this.authService.login(req.user);
    return { ...loginRes, user: new UserEntity(loginRes.user) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Request() req: ExpressRequest & { user: UserTokenPayload },
    @Response() res: ExpressResponse
  ) {
    // await new Promise<void>((resolve, reject) => {
    //   req.session.destroy((err) => (err ? reject(err) : resolve()));
    // });
    await this.authService.logout(req.user);
    res.cookie(authCookieName, '', { maxAge: 0 });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req: ExpressRequest & { user: UserTokenPayload }
  ) {
    console.log('getProfile', req.user);
    const profile = await this.authService.getProfile(req.user);
    return { ...profile, user: new UserEntity(profile.user) };
  }
}
