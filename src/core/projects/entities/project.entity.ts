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

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projects, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
