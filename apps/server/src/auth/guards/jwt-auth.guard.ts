import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // async canActivate(context: ExecutionContext) {
  //   console.log('JwtAuthGuard');
  //   const request = context.switchToHttp().getRequest();
  //   console.log('rrr', request.isAuthenticated());
  //   if (request.isAuthenticated()) {
  //     return true;
  //   }
  //   const result = (await super.canActivate(context)) as boolean;
  //   await super.logIn(request);
  //   return result;
  // }
}
