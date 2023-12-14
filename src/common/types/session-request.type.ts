import { SessionEntity } from '../../core/session/session.entity';

export type SessionRequest = Pick<SessionEntity, 'sessionId' | 'expireAt'>;
