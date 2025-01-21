import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './auth.dto';

export type UserTokenPayload = {
  email: string;
  userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(body: SignupDto) {
    const user = await this.usersService.create(body);
    return this.login({
      email: user.email,
      userId: user.userId,
    });
  }

  async login(user: UserTokenPayload) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logout(_: UserTokenPayload) {
    return true;
  }

  async getProfile(user: UserTokenPayload) {
    return user;
  }
}
