import { Column } from 'typeorm';

export class CreateTaskDto {
  title: string;

  description?: string;

  importance?: string;

  project?: string;

  type: string;

  expireAt?: Date;
}
