import { api } from '@/lib/api';
import type { NotificationResponseDto, CreateNotificationDto, UpdateNotificationDto } from '@saas-template/core';

export const notificationsService = {
  async getAll(): Promise<NotificationResponseDto[]> {
    const response = await api.get('/notifications');
    return response.data;
  },

  async getById(id: string): Promise<NotificationResponseDto> {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  },

  async create(data: CreateNotificationDto): Promise<NotificationResponseDto> {
    const response = await api.post('/notifications', data);
    return response.data;
  },

  async update(id: string, data: UpdateNotificationDto): Promise<NotificationResponseDto> {
    const response = await api.put(`/notifications/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};
