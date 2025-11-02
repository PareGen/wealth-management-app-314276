import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';
import { User } from '../entities/user.entity';

const dataSourceConfig = process.env.DATABASE_URL
  ? {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: [User, Project],
      migrations: ['src/migrations/**/*.ts'],
      migrationsTableName: 'migrations',
      subscribers: [],
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      type: 'postgres' as const,
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'saas_template',
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: [User, Project],
      migrations: ['src/migrations/**/*.ts'],
      migrationsTableName: 'migrations',
      subscribers: [],
    };

export const AppDataSource = new DataSource(dataSourceConfig);
