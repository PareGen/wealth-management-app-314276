import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Portfolio } from './portfolio.entity';
import type { User } from './user.entity';

@Entity({ name: 'reports' })
export class Report extends BaseEntity {
  @Column({ type: 'jsonb', name: 'report_data' })
  reportData!: Record<string, unknown>;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_reports_user_id')
  @ManyToOne('User', 'reports')
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'portfolio_id' })
  portfolioId!: string;

  @Index('idx_reports_portfolio_id')
  @ManyToOne('Portfolio', 'reports')
  @JoinColumn({ name: 'portfolio_id' })
  portfolio!: Portfolio;
}
