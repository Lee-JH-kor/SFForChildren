# Overview

This is a Korean language strengths assessment application built as a full-stack web application. The system implements a two-phase assessment process that evaluates users across 34 different strength themes categorized into 4 domains (실행력/Execution, 영향력/Influence, 대인관계 구축/Relationship Building, 전략적 사고/Strategic Thinking). The application guides users through 54 questions total to identify their top 5 personal strengths with detailed descriptions and development recommendations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React + TypeScript**: Single-page application using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: Custom React hooks (useAssessment) managing assessment flow and data
- **Query Management**: TanStack Query for data fetching and caching
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom pastel color palette and CSS variables for theming

## Backend Architecture
- **Express.js Server**: RESTful API server with middleware for request logging
- **Development Setup**: Vite integration for hot module replacement in development
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and database-ready interface
- **Static File Serving**: Express serves built React application in production

## Assessment Logic
- **Two-Phase Scoring**: Phase 1 (34 questions) identifies top 10 themes, Phase 2 (additional questions) refines top 5 with weighted scoring
- **Adaptive Questioning**: Phase 2 questions are dynamically generated based on Phase 1 results
- **Scoring Algorithm**: Complex scoring with consistency bonuses and tie-breaking mechanisms

## Data Structure
- **Question Data**: Static JSON files containing questions, themes, and descriptions in Korean
- **Assessment State**: Comprehensive state management tracking user progress, answers, and calculated scores
- **Theme Organization**: 34 strength themes organized into 4 domains with detailed descriptions and development guidance

## Database Design
- **Drizzle ORM**: Type-safe database queries with PostgreSQL dialect
- **User Schema**: Basic user table with UUID primary keys
- **Migration System**: Drizzle-kit for database schema management

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Data fetching and state synchronization
- **wouter**: Lightweight routing for React applications
- **drizzle-orm**: Type-safe database queries and migrations

## UI Component Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe component variant management
- **lucide-react**: Icon library for user interface elements

## Development Tools
- **vite**: Fast build tool with hot module replacement
- **typescript**: Type safety across frontend and backend
- **esbuild**: Fast JavaScript bundler for production builds

## Database Integration
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store for Express

## Validation and Forms
- **zod**: Runtime type validation for forms and API responses
- **@hookform/resolvers**: Form validation integration with React Hook Form
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utilities
- **nanoid**: URL-safe unique ID generation