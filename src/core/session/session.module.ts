import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), TokenModule, UserModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
