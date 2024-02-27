import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  importance?: string;

  @ApiProperty()
  project?: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  expireAt?: Date;
}
