import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UserModule } from '../users/user.module';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    UserModule,
    SessionModule,
    TokenModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
