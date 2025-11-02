import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Notification } from '@saas-template/database';
import type { CreateNotificationDto, UpdateNotificationDto } from '@saas-template/core';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  constructor(private dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Notification[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Notification | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.create({
      ...dto,
      userId,
    });
    return this.save(notification);
  }

  async update(id: string, userId: string, dto: UpdateNotificationDto): Promise<Notification | null> {
    const notification = await this.findById(id, userId);
    if (!notification) {
      return null;
    }

    Object.assign(notification, dto);
    return this.save(notification);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const notification = await this.findById(id, userId);
    if (!notification) {
      return false;
    }

    await this.softRemove(notification);
    return true;
  }
}
