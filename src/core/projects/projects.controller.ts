import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { UserRequest } from '../../common/types/user-request.type';
import { User } from '../../common/decorators/User.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @AuthGuard()
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: UserRequest,
  ) {
    return await this.projectsService.save({
      name: createProjectDto.name,
      description: createProjectDto.description,
      user: { uuid: user.uuid },
    });
  }

  @AuthGuard()
  @Get('/me')
  async findAllForUser(@User() user: UserRequest) {
    return await this.projectsService.find({
      where: { user: { uuid: user.uuid } },
    });
  }

  @AuthGuard()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOne({ where: { uuid: id } });
  }

  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectsService.removeOne({ where: { uuid: id } });
  }
}
