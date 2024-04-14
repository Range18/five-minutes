import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('notes')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Project, (project) => project.notes, {
    nullable: false,
  })
  project: Project;
}
