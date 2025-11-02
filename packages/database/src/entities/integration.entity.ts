import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'integrations' })
export class Integration extends BaseEntity {
  @Column({ name: 'institution_name' })
  institutionName!: string;

  @Column({ name: 'api_key' })
  apiKey!: string;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_integrations_user_id')
  @ManyToOne('User', 'integrations')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
