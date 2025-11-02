import { api } from '@/lib/api';
import type { IntegrationResponseDto, CreateIntegrationDto, UpdateIntegrationDto } from '@saas-template/core';

export const integrationsService = {
  async getAll(): Promise<IntegrationResponseDto[]> {
    const response = await api.get('/integrations');
    return response.data;
  },

  async getById(id: string): Promise<IntegrationResponseDto> {
    const response = await api.get(`/integrations/${id}`);
    return response.data;
  },

  async create(data: CreateIntegrationDto): Promise<IntegrationResponseDto> {
    const response = await api.post('/integrations', data);
    return response.data;
  },

  async update(id: string, data: UpdateIntegrationDto): Promise<IntegrationResponseDto> {
    const response = await api.put(`/integrations/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/integrations/${id}`);
  },
};
