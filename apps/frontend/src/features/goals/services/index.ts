import { api } from '@/lib/api';
import type { GoalResponseDto, CreateGoalDto, UpdateGoalDto } from '@saas-template/core';

export const goalsService = {
  async getAll(): Promise<GoalResponseDto[]> {
    const response = await api.get('/goals');
    return response.data;
  },

  async getById(id: string): Promise<GoalResponseDto> {
    const response = await api.get(`/goals/${id}`);
    return response.data;
  },

  async create(data: CreateGoalDto): Promise<GoalResponseDto> {
    const response = await api.post('/goals', data);
    return response.data;
  },

  async update(id: string, data: UpdateGoalDto): Promise<GoalResponseDto> {
    const response = await api.put(`/goals/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/goals/${id}`);
  },
};
