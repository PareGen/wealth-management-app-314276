import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateNotificationDto, NotificationResponseDto, UpdateNotificationDto } from '@saas-template/core';
import type { Notification } from '@saas-template/database';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationsRepository.findAll(userId);
    return notifications.map((notification: Notification) => this.toResponseDto(notification));
  }

  async findOne(id: string, userId: string): Promise<NotificationResponseDto> {
    const notification = await this.notificationsRepository.findById(id, userId);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return this.toResponseDto(notification);
  }

  async create(userId: string, dto: CreateNotificationDto): Promise<NotificationResponseDto> {
    return this.uow.execute(async () => {
      const notification = await this.notificationsRepository.create(userId, dto);
      return this.toResponseDto(notification);
    });
  }

  async update(id: string, userId: string, dto: UpdateNotificationDto): Promise<NotificationResponseDto> {
    return this.uow.execute(async () => {
      const notification = await this.notificationsRepository.update(id, userId, dto);
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }
      return this.toResponseDto(notification);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.notificationsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Notification not found');
      }
    });
  }

  private toResponseDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.id,
      userId: notification.userId,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }
}
