# File Directory Structure

## Project Root
```
/
├── src/
│   ├── components/       # Reusable UI components
│   ├── middleware/       # Application middleware
│   │   └── auth.middleware.ts   # Authentication middleware
│   ├── services/        # Service layer
│   │   ├── auth/
│   │   │   └── auth.service.ts  # Authentication service
│   │   └── db/
│   │       └── db.service.ts    # Database service
│   ├── types/          # TypeScript type definitions
│   │   └── database.ts # Database types
│   ├── utils/          # Utility functions
│   └── App.tsx         # Root component
├── memory-bank/        # Project documentation
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## Key Files

### Authentication
- `src/middleware/auth.middleware.ts`
  - Authentication middleware implementation
  - Route protection
  - User session management
  - HOC for protected components

- `src/services/auth/auth.service.ts`
  - Authentication service implementation
  - Token management
  - User verification
  - Session handling

### Database
- `src/services/db/db.service.ts`
  - Database connection management
  - Query functions
  - Transaction handling
  - Error management

### Types
- `src/types/database.ts`
  - Database model types
  - Query result types
  - Input/Output types
  - Utility types

### Documentation
- `memory-bank/`
  - Project documentation
  - System architecture
  - Technical decisions
  - Progress tracking

## File Purposes

### Middleware Layer
- Authentication flow control
- Route protection
- Session management
- Access control

### Service Layer
- Business logic implementation
- External service integration
- Data access abstraction
- Error handling

### Type Definitions
- Type safety
- Code documentation
- Interface definitions
- Schema validation

### Configuration
- Project setup
- Build configuration
- Development tools
- Environment settings

Last Updated: March 27, 2025 