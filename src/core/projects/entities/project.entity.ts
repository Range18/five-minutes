import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskEntity } from '../../tasks/entity/task.entity';
import { UserEntity } from '../../users/user.entity';
import { Note } from '../../notes/entities/note.entity';
import { BaseEntity } from '../../../common/base.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projects, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @OneToMany(() => Note, (note) => note.project, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  notes?: Note[];
}
