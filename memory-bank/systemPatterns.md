# System Patterns

## Architecture Overview
- React-based frontend
- PostgreSQL database
- RESTful API architecture
- TypeScript throughout
- Component-based structure

## Authentication System
### Implementation Pattern
```typescript
// Core Authentication Components
1. useAuthGuard() - Hook for route protection
   - Checks token presence
   - Validates token
   - Handles redirects

2. useUser() - Hook for user state
   - Manages user data
   - Handles token verification
   - Updates user context

3. withAuth() - HOC for protected components
   - Wraps components requiring auth
   - Integrates with useAuthGuard
   - Handles component protection
```

### Authentication Flow
1. Token Management
   - JWT tokens stored in localStorage
   - Token verification on protected routes
   - Automatic redirect on auth failure

2. User Session
   - User state managed via hooks
   - Persistent session handling
   - Automatic token refresh

## Database Patterns
### Connection Management
- Connection pooling
- Prepared statements
- Transaction support
- Error handling

### Query Patterns
- Parameterized queries
- Type-safe results
- Error boundaries
- Connection pooling

## Component Architecture
### Layout Structure
- Atomic design principles
- Composition over inheritance
- HOC for cross-cutting concerns
- Reusable components

### State Management
- Zustand for global state
- React Query for server state
- Local state when appropriate
- Context for theme/auth

## Error Handling
### Client-Side
- Error boundaries
- Type checking
- Input validation
- Auth error handling

### Server-Side
- HTTP status codes
- Error messages
- Logging
- Recovery strategies

## Security Patterns
### Authentication
- JWT tokens
- Route protection
- Session management
- CSRF protection

### Data Protection
- Input sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

Last Updated: March 27, 2025 