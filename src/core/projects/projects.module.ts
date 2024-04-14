import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TaskEntity } from '../tasks/entity/task.entity';
import { UserEntity } from '../users/user.entity';
import { TokenModule } from '../token/token.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../users/user.module';
import { Note } from '../notes/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, TaskEntity, UserEntity, Note]),
    TokenModule,
    SessionModule,
    UserModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
