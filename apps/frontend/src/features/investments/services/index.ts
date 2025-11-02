import { api } from '@/lib/api';
import type { InvestmentResponseDto, CreateInvestmentDto, UpdateInvestmentDto } from '@saas-template/core';

export const investmentsService = {
  async getAll(): Promise<InvestmentResponseDto[]> {
    const response = await api.get('/investments');
    return response.data;
  },

  async getById(id: string): Promise<InvestmentResponseDto> {
    const response = await api.get(`/investments/${id}`);
    return response.data;
  },

  async create(data: CreateInvestmentDto): Promise<InvestmentResponseDto> {
    const response = await api.post('/investments', data);
    return response.data;
  },

  async update(id: string, data: UpdateInvestmentDto): Promise<InvestmentResponseDto> {
    const response = await api.put(`/investments/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/investments/${id}`);
  },
};
