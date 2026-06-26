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