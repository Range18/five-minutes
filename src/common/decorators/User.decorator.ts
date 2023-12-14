import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequest } from '../types/user-request.type';
import { RequestExtended } from '../types/request-extended.type';

export const User = createParamDecorator(
  (
    key: keyof UserRequest,
    context: ExecutionContext,
  ): boolean | string | UserRequest => {
    const request = context.switchToHttp().getRequest<RequestExtended>();
    const user = request.user;
    return key ? user[key] : user;
  },
);
