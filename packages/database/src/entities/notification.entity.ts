import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @Column()
  message!: string;

  @Column({ type: 'boolean', default: false, name: 'is_read' })
  isRead!: boolean;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_notifications_user_id')
  @ManyToOne('User', 'notifications')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
