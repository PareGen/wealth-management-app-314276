import { api } from '@/lib/api';
import type { PortfolioResponseDto, CreatePortfolioDto, UpdatePortfolioDto } from '@saas-template/core';

export const portfoliosService = {
  async getAll(): Promise<PortfolioResponseDto[]> {
    const response = await api.get('/portfolios');
    return response.data;
  },

  async getById(id: string): Promise<PortfolioResponseDto> {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  async create(data: CreatePortfolioDto): Promise<PortfolioResponseDto> {
    const response = await api.post('/portfolios', data);
    return response.data;
  },

  async update(id: string, data: UpdatePortfolioDto): Promise<PortfolioResponseDto> {
    const response = await api.put(`/portfolios/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/portfolios/${id}`);
  },
};
