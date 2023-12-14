import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/base-entity.service';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;
import { UserRequest } from '../../common/types/user-request.type';

@Injectable()
export class TasksService extends BaseEntityService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly userService: UserService,
  ) {
    super(taskRepository);
  }
}
