import { api } from '@/lib/api';
import type { ReportResponseDto, CreateReportDto, UpdateReportDto } from '@saas-template/core';

export const reportsService = {
  async getAll(): Promise<ReportResponseDto[]> {
    const response = await api.get('/reports');
    return response.data;
  },

  async getById(id: string): Promise<ReportResponseDto> {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  async create(data: CreateReportDto): Promise<ReportResponseDto> {
    const response = await api.post('/reports', data);
    return response.data;
  },

  async update(id: string, data: UpdateReportDto): Promise<ReportResponseDto> {
    const response = await api.put(`/reports/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
  },
};
