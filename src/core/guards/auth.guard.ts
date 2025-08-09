import { UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard as PassportGuard } from '@nestjs/passport';

export class AuthGuard extends PassportGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(
        'You are not authorized to access this route.',
      );
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
