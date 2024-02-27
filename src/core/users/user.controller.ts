import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../common/decorators/User.decorator';
import { UserRequest } from '../../common/types/user-request.type';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { UserService } from './user.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly userService: UserService) {}

  @AuthGuard()
  @Get('/me')
  async getSelf(@User() user: UserRequest) {
    return await this.userService.findOne({
      where: { uuid: user.uuid },
    });
  }

  @AuthGuard()
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne({ where: { uuid: id } });
  }
}
