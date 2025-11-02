import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'portfolios' })
export class Portfolio extends BaseEntity {
  @Column()
  name!: string;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_portfolios_user_id')
  @ManyToOne('User', 'portfolios')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
