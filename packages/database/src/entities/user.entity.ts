import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Project } from './project.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  @Index('idx_users_email')
  email!: string;

  @Column()
  password!: string;

  @OneToMany('Project', 'user', { cascade: ['insert', 'update'] })
  projects!: Project[];
}
