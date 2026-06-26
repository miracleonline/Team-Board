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