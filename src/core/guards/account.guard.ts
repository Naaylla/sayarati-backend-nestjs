import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/shared/types/jwt';

export const Account = createParamDecorator(
  (data: keyof Omit<JwtPayload, 'type'>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Omit<JwtPayload, 'type'>;

    return data ? user?.[data] : user;
  },
);
