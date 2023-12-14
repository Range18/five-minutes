import { Module } from '@nestjs/common';
import { UserModule } from './core/users/user.module';
import { AuthModule } from './core/auth/auth.module';
import { TasksModule } from './core/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
