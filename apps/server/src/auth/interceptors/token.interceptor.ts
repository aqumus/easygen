import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { UserEntity } from '../../users/user.dto';
import { AuthService } from '../auth.service';
import { authCookieName } from '../constants';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<{ user: UserEntity }>
  ): Observable<{ user: UserEntity }> {
    return next.handle().pipe(
      map(({ user, ...rest }) => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authService.signToken(user);

        response.cookie(authCookieName, token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          // TODO: enable secure based on NODE_ENV
          //   secure: process.env.NODE_ENV === 'production',
          secure: false,
          maxAge: Number(process.env.TOKEN_MAX_AGE),
        });

        return { user, ...rest };
      })
    );
  }
}
