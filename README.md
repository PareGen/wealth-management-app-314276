# SaaS Template Monorepo

Modern, production-ready SaaS starter template with Next.js 15, NestJS 10+, and PostgreSQL.

## 🚀 Features

- **Full-Stack TypeScript** - Type-safe across the entire stack
- **Monorepo Architecture** - Turborepo for efficient builds and caching
- **Modern Frontend** - Next.js 15 with App Router, Shadcn/UI, Tailwind CSS
- **Robust Backend** - NestJS with TypeORM, PostgreSQL, JWT authentication
- **Authentication** - Complete auth flow with JWT tokens
- **CRUD Operations** - Example Projects module with full CRUD
- **Docker Support** - Multi-stage Dockerfiles and docker-compose
- **CI/CD** - GitHub Actions for automated testing and deployment
- **Code Quality** - Biome for linting and formatting
- **Type Safety** - Strict TypeScript configuration

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Shadcn/UI + Tailwind CSS
- **State Management**: Zustand + TanStack Query
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS 10+
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator + class-transformer
- **Security**: Helmet, Argon2, CORS, Rate Limiting

### Shared Packages
- **@saas-template/core** - Shared types, DTOs, constants
- **@saas-template/database** - Database entities, migrations, config
- **@saas-template/ui** - Reusable UI components

### DevOps
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: Biome

## 🏗️ Project Structure

```
.
├── apps/
│   ├── frontend/          # Next.js 15 application
│   └── api/              # NestJS application
├── packages/
│   ├── core/             # Shared types, DTOs, constants
│   ├── database/         # TypeORM entities and migrations
│   └── ui/               # Shared UI components
├── docker/
│   ├── frontend/         # Frontend Dockerfile
│   ├── api/              # API Dockerfile
│   └── postgres/         # PostgreSQL config
├── .github/
│   └── workflows/        # CI/CD pipelines
├── docker-compose.yml    # Docker orchestration
├── turbo.json           # Turborepo configuration
└── pnpm-workspace.yaml  # pnpm workspace configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 15+ (or use Docker)
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-template-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp apps/api/env.example apps/api/.env.local
   
   # Frontend
   cp apps/frontend/env.example apps/frontend/.env.local
   
   # Database
   cp packages/database/env.example packages/database/.env
   ```

4. **Start PostgreSQL** (if not using Docker)
   ```bash
   # Or use Docker
   docker-compose up -d postgres
   ```

5. **Run database migrations**
   ```bash
   cd packages/database
   pnpm migration:run
   ```

6. **Start development servers**
   ```bash
   pnpm dev
   ```

   The following services will be available:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - API Docs: http://localhost:3001/api/v1

### Docker Setup

Run the entire stack with Docker:

```bash
docker-compose up -d
```

Services:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- PostgreSQL: localhost:5432

## 📝 Available Scripts

### Root Level
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run linter on all packages
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm clean` - Clean all build artifacts

### Backend (apps/api)
- `pnpm dev` - Start in watch mode
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Frontend (apps/frontend)
- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Database (packages/database)
- `pnpm migration:generate` - Generate new migration
- `pnpm migration:run` - Run pending migrations
- `pnpm migration:revert` - Revert last migration

## 🔑 Environment Variables

### Backend (.env.local)
```env
NODE_ENV=development
PORT=3001
API_PREFIX=/api/v1

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=saas_template

JWT_SECRET=your-secret-key
JWT_EXPIRY=1d

CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 🔐 Authentication Flow

1. **Register**: POST `/api/v1/auth/register`
   - Email and password (min 8 chars)
   - Returns JWT token and user info

2. **Login**: POST `/api/v1/auth/login`
   - Email and password
   - Returns JWT token and user info

3. **Get Profile**: GET `/api/v1/auth/profile`
   - Requires Bearer token
   - Returns authenticated user info

4. **Protected Routes**: All `/dashboard/*` routes require authentication

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get current user (protected)

### Projects (Protected)
- `GET /api/v1/projects` - List all user projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create new project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project (soft delete)

## 🏛️ Architecture

This template follows Clean Architecture principles:

- **Domain Layer**: Entities and business logic (packages/database)
- **Application Layer**: Use cases and services (modules/*/services)
- **Infrastructure Layer**: Database, external services (core/database)
- **Interface Layer**: Controllers, DTOs, HTTP (modules/*/controllers)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information.

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run e2e tests
pnpm test:e2e
```

## 🚢 Deployment

### Docker Deployment

1. Build images:
   ```bash
   docker-compose build
   ```

2. Start services:
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. Build all packages:
   ```bash
   pnpm build
   ```

2. Set production environment variables

3. Run migrations:
   ```bash
   cd packages/database
   NODE_ENV=production pnpm migration:run
   ```

4. Start services:
   ```bash
   # API
   cd apps/api
   NODE_ENV=production node dist/main.js
   
   # Frontend
   cd apps/frontend
   pnpm start
   ```

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## 📄 License

MIT

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Turborepo](https://turbo.build/)
- [TypeORM](https://typeorm.io/)

