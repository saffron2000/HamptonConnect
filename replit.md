# Columbia Founder Community (CFC) Website

## Overview

This is a comprehensive web application for the Columbia Founder Community, an exclusive membership organization for Columbia-connected entrepreneurs, founders, and CEOs. The platform serves as both a public-facing website to attract new members and a private portal for existing members.

The application combines modern web technologies with a clean, professional design that reflects Columbia University's branding while providing essential functionality for community management, contact handling, and member authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using functional components and hooks
- **Vite**: Development server and build tool for fast development and optimized production builds
- **Wouter**: Lightweight client-side routing for navigation between pages
- **TailwindCSS**: Utility-first CSS framework with custom Columbia University color scheme
- **Shadcn/ui**: Component library built on Radix UI primitives for consistent, accessible UI components

### Backend Architecture
- **Express.js**: RESTful API server handling contact forms, authentication, and member portal access
- **TypeScript**: Type-safe server implementation with shared schemas between frontend and backend
- **Memory Storage**: In-memory data storage for development with interface abstraction for easy database migration
- **Session Management**: Basic authentication system with hardcoded credentials for portal access

### Database Schema
The application defines two main entities:
- **Users**: Authentication credentials for member portal access (id, username, password)
- **Contacts**: Contact form submissions from potential members (id, fullName, email, message, createdAt)

### Data Layer
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect configuration
- **Zod Validation**: Runtime schema validation for API endpoints and form submissions
- **Shared Schemas**: Common type definitions between client and server

### Build and Development
- **Development Mode**: Hot module reloading with Vite middleware integration
- **Production Build**: Static asset generation with Express server for API endpoints
- **TypeScript Configuration**: Monorepo setup with path aliases for clean imports

### UI/UX Design Patterns
- **Columbia Branding**: Custom color scheme using Columbia blue (#B9D3EE) and navy blue (#003C71)
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Component Architecture**: Reusable UI components with consistent styling patterns
- **Accessibility**: ARIA labels and keyboard navigation support through Radix UI

## External Dependencies

### Core Framework Dependencies
- **React 18**: Component library for building user interfaces
- **Express.js**: Web application framework for Node.js
- **TypeScript**: Static type checking for JavaScript
- **Vite**: Build tool and development server

### Database and ORM
- **Drizzle ORM**: Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL database connectivity (configured but not actively used)
- **Drizzle-kit**: Database migration and schema management tools

### UI and Styling
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Headless UI component primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Form Handling and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Routing and State Management
- **Wouter**: Lightweight routing library for React
- **@tanstack/react-query**: Server state management and caching

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Third-party Service Integrations
- **Typeform**: External form builder for membership applications (placeholder implementation)
- **Unsplash**: Image hosting service for member photos and event images
- **Email Service**: Contact form submissions (ready for integration with services like SendGrid or AWS SES)

## Deployment Configuration

### Required Environment Variables

The application requires the following environment variables for proper deployment:

#### GOOGLE_CALENDAR_API_KEY
- **Purpose**: Enables integration with Google Calendar API to fetch community events
- **Required for**: Events page functionality
- **Behavior without**: Application gracefully falls back to showing empty events list with informational message
- **How to obtain**: 
  1. Create a project in Google Cloud Console
  2. Enable the Google Calendar API
  3. Create credentials (API key)
  4. Restrict the key to Calendar API for security

#### SESSION_SECRET
- **Purpose**: Secures user sessions and authentication cookies
- **Required for**: Member portal login functionality and session management
- **Behavior without**: Uses development fallback secret (insecure for production)
- **Security**: Should be a long, random string (32+ characters) unique to each deployment environment
- **Example generation**: `openssl rand -base64 32`

### Deployment Checklist

Before deploying to production:

1. **Configure Environment Variables**:
   - Set `GOOGLE_CALENDAR_API_KEY` with valid Google Calendar API credentials
   - Set `SESSION_SECRET` with a secure, randomly generated string
   - Ensure `NODE_ENV=production` for production deployments

2. **Security Considerations**:
   - Session cookies are automatically configured as secure in production
   - Google Calendar API key should be restricted to specific APIs and referrers
   - Never commit environment variables to version control

3. **Error Handling**:
   - Calendar API failures gracefully degrade to empty events list
   - Missing environment variables are logged with clear warnings
   - Server startup validates all required environment variables

### Environment Setup Commands

For local development:
```bash
# Create .env file (not committed to repo)
echo "GOOGLE_CALENDAR_API_KEY=your_api_key_here" > .env
echo "SESSION_SECRET=your_secret_here" >> .env
```

For Replit Deployment:
- Configure secrets in the Replit deployment environment variables section
- Secrets are automatically available as environment variables at runtime