import { TokenPayload } from './types/user.payload';

export type CreateSession = Pick<TokenPayload, 'userUUID'>;
