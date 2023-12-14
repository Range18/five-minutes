import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/base-entity.service';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService extends BaseEntityService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }
}
