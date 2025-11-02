import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'goals' })
export class Goal extends BaseEntity {
  @Column()
  description!: string;

  @Column({ type: 'integer', name: 'target_amount' })
  targetAmount!: number;

  @Column({ type: 'timestamp with time zone', name: 'due_date' })
  dueDate!: Date;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_goals_user_id')
  @ManyToOne('User', 'goals')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
