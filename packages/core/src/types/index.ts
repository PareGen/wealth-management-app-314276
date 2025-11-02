export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface UserEntity extends BaseEntity {
  email: string;
  password: string;
}

export interface ProjectEntity extends BaseEntity {
  name: string;
  description: string;
  userId: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface JwtPayload {
  sub: string;
  email: string;
  role?: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}
