import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from '@/types/active-user';
import { REQUEST_USER_KEY } from '@/constants/meta.constant';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserInterface | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
