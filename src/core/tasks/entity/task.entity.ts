import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  importance?: string;

  @Column({ nullable: false })
  type: string;

  @ManyToOne(() => Project, (project) => project.tasks, { nullable: true })
  @JoinColumn({ name: 'projectId' })
  project?: Project;

  @Column({ nullable: true })
  expireAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
