import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ name: 'user_id' })
  @Index('idx_projects_user_id')
  userId!: string;

  @ManyToOne('User', 'projects')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
