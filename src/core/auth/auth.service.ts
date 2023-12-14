import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import SessionExceptions = AllExceptions.SessionExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import { TokenService } from '../token/token.service';
import { backendServer, passwordSaltRounds } from '../../common/configs/config';
import { TokenPayload } from '../session/types/user.payload';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,

    private readonly tokenService: TokenService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }
    const userEntity = await this.userService.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
    });

    const session = await this.sessionService.createSession({
      userUUID: userEntity.uuid,
    });

    return new LoggedUserRdo(
      session.refreshToken,
      session.sessionExpireAt,
      userEntity.email,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const comparedPasswords = await bcrypt.compare(
      user.password,
      loginUserDto.password,
    );

    if (!comparedPasswords) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.WrongPassword,
      );
    }
    const session = await this.sessionService.createSession({
      userUUID: user.uuid,
    });

    return new LoggedUserRdo(
      session.refreshToken,
      session.sessionExpireAt,
      user.email,
    );
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      );
    }

    const tokenPayload = await this.tokenService.verifyAsync<TokenPayload>(
      refreshToken,
    );
    await this.sessionService.removeOne({
      where: { sessionId: tokenPayload.sessionId },
    });
  }
}
