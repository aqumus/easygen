import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export type UserTokenPayload = {
  email: string;
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(body: SignupDto) {
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const user = await this.usersService.create({
      ...body,
      password: hashedPassword,
    });
    return this.login(user);
  }

  async login(user: UserTokenPayload) {
    return {
      access_token: this.signToken(user),
      user,
    };
  }

  async logout(_: UserTokenPayload) {
    return true;
  }

  async getProfile(userPayload: UserTokenPayload) {
    const user = await this.usersService.findOne(userPayload.email);
    return { user };
  }

  signToken(user: UserTokenPayload): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
