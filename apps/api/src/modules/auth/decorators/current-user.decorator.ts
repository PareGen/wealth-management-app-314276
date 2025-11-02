import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { User } from '@saas-template/database';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
