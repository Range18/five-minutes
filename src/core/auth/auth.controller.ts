import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { backendServer, jwtConfig } from '../../common/configs/config';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Cookie } from '../../common/decorators/cookie.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.register(createUserDto);

    response.cookie('token', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.login(loginUserDto);

    response.cookie('token', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @Delete('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Cookie('token') refreshToken: string,
  ): Promise<void> {
    await this.authService.logout(refreshToken);

    response.clearCookie('token');
  }
}
