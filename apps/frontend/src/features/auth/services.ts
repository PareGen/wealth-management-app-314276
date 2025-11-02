import { api } from '@/lib/api';
import type { AuthResponseDto, LoginDto, RegisterDto } from '@saas-template/core';

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/login', data);
    return response.data;
  },

  async getProfile(): Promise<{ id: string; email: string }> {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};
