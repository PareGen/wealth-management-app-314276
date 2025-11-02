# Contributing Guide

Thank you for contributing to the SaaS Template Monorepo!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Copy environment files and configure them
4. Run development servers: `pnpm dev`

## Code Standards

### TypeScript

- **Strict Mode**: All code must pass TypeScript strict mode checks
- **No `any`**: Avoid using `any` type, use `unknown` if necessary
- **Explicit Types**: Always define return types for functions
- **Null Safety**: Handle null/undefined cases explicitly

### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.ts`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Functions/Variables**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_PREFIX`)
- **Interfaces**: PascalCase, no `I` prefix (e.g., `User`, not `IUser`)

### Code Formatting

This project uses Biome for linting and formatting:

```bash
# Check code
pnpm check

# Fix issues
pnpm check --apply

# Format only
pnpm format
```

**Rules**:
- 2 spaces for indentation
- Single quotes
- Semicolons required
- Max line width: 100 characters
- No unused imports or variables

## Commit Guidelines

Follow Conventional Commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(auth): add password reset functionality
fix(projects): resolve delete confirmation bug
docs(readme): update installation instructions
```

## Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

## Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all checks pass:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```
4. Write meaningful commit messages
5. Update documentation if needed
6. Submit PR to `develop` branch
7. Wait for review and address feedback

## Database Changes

### Creating Migrations

1. Modify entity files in `packages/database/src/entities/`
2. Generate migration:
   ```bash
   cd packages/database
   pnpm migration:generate -- -n DescriptiveName
   ```
3. Review generated migration file
4. Test migration:
   ```bash
   pnpm migration:run
   pnpm migration:revert
   ```

### Migration Rules

- **Always reversible**: Implement both `up` and `down` methods
- **Explicit naming**: Use descriptive migration names
- **No data loss**: Be cautious with destructive operations
- **Test thoroughly**: Test on development database first

## Adding New Features

### Backend Module

1. Create module directory: `apps/api/src/modules/feature-name/`
2. Implement:
   - `feature.module.ts` - Module definition
   - `feature.service.ts` - Business logic
   - `feature.controller.ts` - HTTP endpoints
   - `feature.repository.ts` - Database operations
3. Register in `app.module.ts`
4. Add DTOs to `packages/core/src/dtos/`

### Frontend Feature

1. Create feature directory: `apps/frontend/src/features/feature-name/`
2. Implement:
   - `components/` - UI components
   - `hooks/` - Custom React hooks
   - `services.ts` - API calls
   - `types.ts` - TypeScript types
3. Create pages in `apps/frontend/src/app/`

## Testing

### Unit Tests

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### E2E Tests

```bash
pnpm test:e2e
```

### Test Guidelines

- Write tests for business logic
- Mock external dependencies
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

## Security

- **Never commit secrets**: Use environment variables
- **Sanitize inputs**: Always validate and sanitize user input
- **Use parameterized queries**: Prevent SQL injection
- **Hash passwords**: Use Argon2 or bcrypt
- **Rate limiting**: Implement for all public endpoints

## Performance

- **Optimize queries**: Use proper indexes and avoid N+1 problems
- **Cache when possible**: Use TanStack Query for client-side caching
- **Lazy load**: Code-split and lazy load heavy components
- **Monitor bundle size**: Keep frontend bundle optimized

## Documentation

- **Code comments**: Explain "why", not "what"
- **JSDoc**: Document public APIs
- **README updates**: Keep documentation current
- **Architecture docs**: Update when making structural changes

## Getting Help

- Check existing issues and discussions
- Read the documentation thoroughly
- Ask in discussions for general questions
- Create issues for bugs or feature requests

## Code Review Checklist

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] No console.log or debug code
- [ ] Documentation updated
- [ ] Environment variables documented
- [ ] Migration tested (if applicable)
- [ ] Security considerations addressed

