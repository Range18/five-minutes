import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/base-entity.service';
import { SessionEntity } from './session.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayload } from './types/user.payload';
import { TokenService } from '../token/token.service';
import { jwtConfig } from '../../common/configs/config';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;
import { CreateSession } from './create-session.type';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';

@Injectable()
export class SessionService extends BaseEntityService<SessionEntity> {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {
    super(sessionRepository);
  }

  async createSession(payload: CreateSession): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { uuid: payload.userUUID },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const expireAt = new Date(Date.now() + jwtConfig.refreshExpire.ms());

    const session = await this.save({
      user: user,
      expireAt: expireAt,
    });

    return {
      refreshToken: await this.tokenService.signAsync(
        {
          userUUID: payload.userUUID,
          sessionId: session.sessionId,
        } as TokenPayload,
        { expiresIn: jwtConfig.refreshExpire.value },
      ),
      sessionExpireAt: expireAt,
      email: user.email,
    };
  }
  override async removeOne(
    entityOrToken: FindOneOptions<SessionEntity> | SessionEntity | string,
    throwError = false,
  ): Promise<void> {
    const entity =
      typeof entityOrToken === 'string'
        ? await this.findOne({
            where: {
              sessionId: (
                await this.tokenService.verifyAsync<TokenPayload>(entityOrToken)
              ).sessionId,
            },
          })
        : entityOrToken;

    return super.removeOne(entity, throwError);
  }
}
