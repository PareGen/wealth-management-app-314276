export const API_PREFIX = '/api/v1';

export const AUTH_ENDPOINTS = {
  REGISTER: `${API_PREFIX}/auth/register`,
  LOGIN: `${API_PREFIX}/auth/login`,
  PROFILE: `${API_PREFIX}/auth/profile`,
} as const;

export const PROJECT_ENDPOINTS = {
  BASE: `${API_PREFIX}/projects`,
  BY_ID: (id: string) => `${API_PREFIX}/projects/${id}`,
} as const;

export const JWT_CONFIG = {
  EXPIRY: '1d',
  REFRESH_EXPIRY: '7d',
} as const;

export const DATABASE_CONFIG = {
  MAX_CONNECTIONS: 10,
  CONNECTION_TIMEOUT: 5000,
} as const;
