import { Request } from 'express';
import { UserRequest } from './user-request.type';
import { SessionRequest } from './session-request.type';

export type RequestExtended = Request & {
  user?: UserRequest;
  session?: SessionRequest;
};
