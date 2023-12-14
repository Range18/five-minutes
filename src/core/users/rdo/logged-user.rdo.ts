import { Exclude, Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Exclude()
  readonly refreshToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  readonly email: string;

  constructor(refreshToken: string, sessionExpireAt: Date, email: string) {
    this.refreshToken = refreshToken;
    this.sessionExpireAt = sessionExpireAt;
    this.email = email;
  }
}
