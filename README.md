# Authentication Module

## Features Completed

- NestJS project setup
- MongoDB connection using Mongoose
- Environment configuration
- ValidationPipe
- User Schema
- Users Module
- Authentication Module
- Signup endpoint
- Login endpoint
- Password hashing using bcrypt
- JWT authentication
- JWT Strategy
- JWT Guard
- Protected Profile endpoint

## Endpoints

POST /auth/signup

POST /auth/login

GET /auth/profile

## Notes

Authentication uses JWT Bearer Tokens.

Passwords are securely hashed with bcrypt before storage.

Validation is handled using class-validator.

Environment variables are managed through @nestjs/config.

# Project Management

## Features Completed

- Project Schema
- Create Project
- View User Projects
- View Single Project
- Update Project
- Delete Project
- Ownership validation
- JWT protected routes

## Endpoints

POST /projects

GET /projects

GET /projects/:id

PATCH /projects/:id

DELETE /projects/:id

## Design Decisions

Each project belongs to one authenticated user.

Users can only access their own projects.

Ownership is enforced in the database queries rather than filtering after retrieval.

Project validation uses DTOs and class-validator.

# Task Management

## Features Completed

- Task Schema
- Create Task
- View Tasks
- Update Task
- Delete Task
- Task Status (Todo, In Progress, Done)
- Project ownership validation
- JWT protected routes

## Endpoints

POST /tasks

GET /tasks

PATCH /tasks/:id

DELETE /tasks/:id

## Design Decisions

Each task belongs to:

- One project
- One authenticated user

A user cannot create a task inside a project they do not own.

Task status is implemented using an enum for consistency and validation.

Relationships are managed using MongoDB ObjectIds with Mongoose references.

DTOs are used to validate all incoming request data before reaching the service layer.

Business logic is kept inside the service while controllers only handle HTTP requests and responses.

# Frontend Authentication Setup

### Project Setup

- React + TypeScript using Vite
- React Router DOM configured
- Axios configured
- React Hook Form installed
- React Toastify configured
- JWT authentication flow started

---

## Features

- User Signup
- User Login
- Authentication Context
- Protected Routes
- Automatic JWT attachment using Axios Interceptors
- Logout
- Toast Notifications
- Basic responsive layout

---

## Pages

- Login
- Signup
- Dashboard
- Projects (placeholder)
- Tasks (placeholder)

---

## Design Decisions

- Context API is used for authentication state management.
- Axios is centralized inside a single API service.
- Authentication logic is separated into service files.
- Protected routes prevent unauthorized access.
- Pages remain intentionally simple to prioritize functionality over design.

