import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../../common/decorators/User.decorator';
import { UserRequest } from '../../common/types/user-request.type';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @AuthGuard()
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: UserRequest,
  ) {
    return await this.tasksService.save({
      user: { uuid: user.uuid },
      title: createTaskDto.title,
      description: createTaskDto.description,
      importance: createTaskDto.importance,
      project: { id: createTaskDto.project },
      type: createTaskDto.type,
      expireAt: createTaskDto.expireAt,
    });
  }

  @AuthGuard()
  @Get('/me')
  async getUserTasks(@User() user: UserRequest) {
    return await this.tasksService.find({
      where: { user: { uuid: user.uuid } },
    });
  }

  @AuthGuard()
  @Get(':id')
  async getTask(@Param('id') id: number) {
    return await this.tasksService.findOne({ where: { id: id } });
  }

  @AuthGuard()
  @Delete(':id')
  async removeTask(@Param('id') id: number) {
    return await this.tasksService.removeOne({ where: { id: id } });
  }
}
