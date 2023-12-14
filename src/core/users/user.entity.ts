import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { TaskEntity } from '../tasks/entity/task.entity';
import { Project } from '../projects/entities/project.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @CreateDateColumn()
  readonly createdAt: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks?: TaskEntity[];

  @OneToMany(() => Project, (project) => project.user)
  projects?: Project[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
