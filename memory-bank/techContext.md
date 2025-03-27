# Technical Context

## Technology Stack
### Frontend
- React 18
- TypeScript 5.x
- TailwindCSS
- React Router v6
- Zustand for state management
- React Query for data fetching

### Backend
- Node.js
- PostgreSQL
- Express.js
- TypeScript
- JWT for authentication

### Development Tools
- Vite
- ESLint
- Prettier
- Jest
- React Testing Library
- Husky for git hooks

## Authentication Implementation
### Core Components
```typescript
// Authentication Middleware Structure
1. useAuthGuard
   - Token validation
   - Route protection
   - Navigation control

2. useUser
   - User state management
   - Session handling
   - Token refresh logic

3. withAuth HOC
   - Component protection
   - Authentication flow
   - Type-safe implementation
```

### Security Measures
- JWT token implementation
- Secure token storage
- CSRF protection
- XSS prevention
- Route guards

## Development Setup
### Required Environment Variables
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret-key
API_URL=http://localhost:3000
NODE_ENV=development
```

### Installation Steps
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Initialize database
5. Start development server

## Technical Constraints
### Authentication
- Token-based authentication
- Protected route implementation
- Session management
- Role-based access

### Database
- PostgreSQL constraints
- Connection pooling
- Query optimization
- Transaction management

### Performance
- Code splitting
- Lazy loading
- Caching strategies
- Bundle optimization

## Dependencies
### Core Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "typescript": "^5.0.0",
  "zustand": "^4.0.0",
  "@tanstack/react-query": "^4.0.0",
  "tailwindcss": "^3.0.0",
  "jsonwebtoken": "^9.0.0"
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.0.0",
  "@types/node": "^18.0.0",
  "eslint": "^8.0.0",
  "prettier": "^2.0.0",
  "jest": "^29.0.0",
  "@testing-library/react": "^13.0.0"
}
```

Last Updated: March 27, 2025 