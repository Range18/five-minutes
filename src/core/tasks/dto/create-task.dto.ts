import { Column } from 'typeorm';

export class CreateTaskDto {
  title: string;

  description?: string;

  project?: string;

  type: string;

  expireAt?: Date;
}
