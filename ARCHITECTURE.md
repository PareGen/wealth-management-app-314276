# Architecture Documentation

## System Overview

This SaaS template follows Clean Architecture principles with a monorepo structure, separating concerns across multiple layers and packages.

## Architecture Layers

### 1. Domain Layer (packages/database)

**Responsibility**: Core business entities and domain logic

```
packages/database/
├── src/
│   ├── entities/
│   │   ├── base.entity.ts      # Base entity with common fields
│   │   ├── user.entity.ts      # User domain entity
│   │   └── project.entity.ts   # Project domain entity
│   └── config/
│       └── data-source.ts      # TypeORM configuration
```

**Principles**:
- Pure business logic
- Framework-agnostic
- No external dependencies except TypeORM
- Entities define the database schema

### 2. Application Layer (apps/api/modules)

**Responsibility**: Use cases, business logic orchestration

```
apps/api/src/modules/
├── auth/
│   ├── auth.service.ts         # Authentication business logic
│   ├── strategies/             # Passport strategies
│   └── guards/                 # Auth guards
├── users/
│   ├── users.service.ts        # User management logic
│   └── users.repository.ts     # User data access
└── projects/
    ├── projects.service.ts     # Project business logic
    └── projects.repository.ts  # Project data access
```

**Principles**:
- Coordinates domain entities
- Implements business rules
- Orchestrates transactions (UnitOfWork)
- No direct HTTP concerns

### 3. Infrastructure Layer (apps/api/core)

**Responsibility**: External services, database, frameworks

```
apps/api/src/core/
├── database/
│   ├── database.module.ts      # TypeORM module setup
│   ├── unit-of-work.service.ts # Transaction management
│   └── generic-crud.service.ts # Reusable CRUD operations
└── config/
    └── config.schema.ts        # Environment validation
```

**Principles**:
- Framework-specific code
- External service integrations
- Database connection management
- Transaction handling

### 4. Interface Layer (apps/api/modules/*/controllers)

**Responsibility**: HTTP API, DTOs, request/response handling

```
apps/api/src/modules/
├── auth/
│   └── auth.controller.ts      # Auth endpoints
├── users/
│   └── users.controller.ts     # User endpoints (if needed)
└── projects/
    └── projects.controller.ts  # Project CRUD endpoints
```

**Principles**:
- HTTP-specific logic
- Request validation
- Response formatting
- Route definitions

## Data Flow

### Request Flow

```
1. HTTP Request
   ↓
2. Controller (Validation, Guards)
   ↓
3. Service (Business Logic)
   ↓
4. Repository (Data Access)
   ↓
5. Database (PostgreSQL)
   ↓
6. Response (DTO Transformation)
```

### Example: Create Project Flow

```typescript
// 1. HTTP Request
POST /api/v1/projects
Body: { name: "My Project", description: "..." }
Headers: { Authorization: "Bearer <token>" }

// 2. Controller - Validation & Guards
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  @Post()
  async create(@Body() dto: CreateProjectDto, @CurrentUser() user: User) {
    return this.projectsService.create(user.id, dto);
  }
}

// 3. Service - Business Logic
export class ProjectsService {
  async create(userId: string, dto: CreateProjectDto) {
    return this.uow.execute(async () => {
      const project = await this.repository.create(userId, dto.name, dto.description);
      return this.toResponseDto(project);
    });
  }
}

// 4. Repository - Data Access
export class ProjectsRepository {
  async create(userId: string, name: string, description?: string) {
    const project = this.repository.create({ userId, name, description });
    return this.repository.save(project);
  }
}

// 5. Database - TypeORM
INSERT INTO projects (id, user_id, name, description, created_at, updated_at)
VALUES (uuid_generate_v4(), $1, $2, $3, NOW(), NOW());

// 6. Response - DTO
{
  "id": "uuid",
  "name": "My Project",
  "description": "...",
  "userId": "uuid",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Dependency Flow

```
┌─────────────────────────────────────┐
│         Interface Layer             │
│     (Controllers, DTOs)             │
└──────────────┬──────────────────────┘
               ↓ depends on
┌─────────────────────────────────────┐
│       Application Layer             │
│   (Services, Use Cases)             │
└──────────────┬──────────────────────┘
               ↓ depends on
┌─────────────────────────────────────┐
│         Domain Layer                │
│   (Entities, Business Logic)        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Infrastructure Layer           │
│  (Database, External Services)      │
└─────────────────────────────────────┘
         ↑ implements
```

**Rule**: Dependencies point inward only. Inner layers never depend on outer layers.

## Frontend Architecture

### Feature-Based Structure

```
apps/frontend/src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   ├── (auth)/                # Auth group
│   │   ├── login/
│   │   └── register/
│   └── (dashboard)/           # Protected group
│       ├── layout.tsx         # Dashboard layout
│       └── projects/
├── features/                   # Feature modules
│   ├── auth/
│   │   ├── components/        # Auth-specific components
│   │   ├── hooks/             # Auth hooks
│   │   └── services.ts        # Auth API calls
│   └── projects/
│       ├── components/        # Project components
│       ├── hooks/             # Project hooks
│       └── services.ts        # Project API calls
├── components/                 # Shared components
│   ├── layout/                # Layout components
│   └── ui/                    # UI primitives
└── lib/                       # Utilities
    ├── api.ts                 # Axios instance
    └── auth-store.ts          # Auth state
```

### State Management

**Server State (TanStack Query)**:
- API data fetching
- Caching and synchronization
- Optimistic updates

**Client State (Zustand)**:
- Authentication state
- UI preferences
- Global app state

### Data Flow

```
1. User Interaction
   ↓
2. Component Event Handler
   ↓
3. React Hook (useQuery/useMutation)
   ↓
4. Service Function (API call)
   ↓
5. Axios Interceptor (Add JWT)
   ↓
6. Backend API
   ↓
7. Response
   ↓
8. TanStack Query Cache Update
   ↓
9. Component Re-render
```

## Security Architecture

### Authentication Flow

```
1. User submits credentials
   ↓
2. Backend validates (email + password)
   ↓
3. Generate JWT token (contains user ID, email)
   ↓
4. Return token to frontend
   ↓
5. Store in localStorage + Zustand
   ↓
6. Attach to all subsequent requests (Authorization header)
   ↓
7. Backend validates JWT on protected routes
```

### Authorization

- **JWT Guards**: Protect routes at controller level
- **User Context**: Extract user from JWT payload
- **Resource Ownership**: Verify user owns resources (projects)

### Data Protection

- **Password Hashing**: Argon2 algorithm
- **SQL Injection**: Parameterized queries (TypeORM)
- **XSS Prevention**: Input sanitization, CSP headers
- **CSRF**: Token validation for state-changing operations
- **Rate Limiting**: Throttler module prevents abuse

## Database Architecture

### Schema Design

```
┌─────────────┐           ┌──────────────┐
│    users    │           │   projects   │
├─────────────┤           ├──────────────┤
│ id (PK)     │◄──────────┤ user_id (FK) │
│ email       │    1:N    │ id (PK)      │
│ password    │           │ name         │
│ created_at  │           │ description  │
│ updated_at  │           │ created_at   │
│ deleted_at  │           │ updated_at   │
└─────────────┘           │ deleted_at   │
                          └──────────────┘
```

### Migration Strategy

1. **Never modify existing migrations**
2. **Generate new migration for schema changes**
3. **Test both up and down methods**
4. **Backup data before production migrations**

### Soft Deletes

All entities use soft deletes (`deleted_at` column):
- Preserves data integrity
- Enables audit trails
- Allows data recovery
- Maintains referential integrity

## Scalability Considerations

### Horizontal Scaling

- **Stateless API**: No server-side sessions, JWT-based auth
- **Database Connection Pooling**: Configurable pool size
- **Load Balancing**: Multiple API instances behind load balancer

### Caching Strategy

- **Client-Side**: TanStack Query (60s stale time)
- **Server-Side**: Redis can be added for session storage
- **Database**: Query result caching, proper indexing

### Performance Optimization

- **Database Indexes**: All foreign keys and frequently queried fields
- **N+1 Prevention**: Use eager loading where appropriate
- **Bundle Optimization**: Code splitting, lazy loading
- **Image Optimization**: Next.js Image component

## Monitoring & Observability

### Logging

- **Development**: Console logs with request context
- **Production**: Structured logging (JSON format)
- **Log Levels**: error, warn, info, debug

### Error Handling

- **Global Exception Filter**: Catches all errors
- **Typed Errors**: HTTP exceptions with proper status codes
- **Error Responses**: Consistent error format

### Health Checks

- `/health` endpoint for service health
- Database connection check
- Ready for Kubernetes probes

## Deployment Architecture

### Docker Deployment

```
┌─────────────────────────────────────────┐
│           Docker Compose                │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Frontend │  │   API    │  │   DB   ││
│  │  :3000   │  │  :3001   │  │ :5432  ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘
```

### Production Deployment

```
┌────────────────────────────────────────────┐
│            Load Balancer                   │
└──────┬────────────────────────┬────────────┘
       │                        │
       ↓                        ↓
┌─────────────┐          ┌─────────────┐
│   API (1)   │          │   API (2)   │
└──────┬──────┘          └──────┬──────┘
       │                        │
       └────────┬───────────────┘
                ↓
        ┌──────────────┐
        │  PostgreSQL  │
        │   (Primary)  │
        └──────────────┘
```

## Technology Decisions

### Why Next.js?

- Server-side rendering for SEO
- App Router for modern routing
- Built-in optimizations (images, fonts)
- Great developer experience

### Why NestJS?

- TypeScript-first framework
- Modular architecture
- Built-in dependency injection
- Enterprise-ready features

### Why TypeORM?

- TypeScript support
- Migration system
- Active Record & Data Mapper patterns
- Good PostgreSQL support

### Why Turborepo?

- Fast incremental builds
- Built-in caching
- Parallel execution
- Simple configuration

## Future Enhancements

- [ ] Redis for caching and sessions
- [ ] WebSocket support for real-time features
- [ ] File upload with S3
- [ ] Email service integration
- [ ] Multi-tenancy support
- [ ] GraphQL API option
- [ ] Microservices architecture
- [ ] Kubernetes deployment

