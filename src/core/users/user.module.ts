import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { SessionModule } from '../session/session.module';
import { TokenService } from '../token/token.service';
import { SessionService } from '../session/session.service';
import { JwtService } from '@nestjs/jwt';
import { SessionEntity } from '../session/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SessionEntity])],
  controllers: [UsersController],
  providers: [SessionService, TokenService, JwtService, UserService],
  exports: [UserService],
})
export class UserModule {}
