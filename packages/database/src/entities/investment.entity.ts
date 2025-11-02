import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Portfolio } from './portfolio.entity';

@Entity({ name: 'investments' })
export class Investment extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'timestamp with time zone', name: 'investment_date' })
  investmentDate!: Date;


@Column({ name: 'portfolio_id' })
  portfolioId!: string;

  @Index('idx_investments_portfolio_id')
  @ManyToOne('Portfolio', 'investments')
  @JoinColumn({ name: 'portfolio_id' })
  portfolio!: Portfolio;
}
