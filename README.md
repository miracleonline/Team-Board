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

# Frontend Projects CRUD Setup

## Project Setup
- React + TypeScript using Vite
- React Router DOM configured
- Axios API service layer implemented
- React Hook Form ready (for future enhancement)
- React Toastify configured
- JWT authentication already in place
- Full CRUD flow introduced (Projects)

## Features
- View all projects for logged-in user
- Create new projects
- Edit existing projects
- Delete projects
- Inline form-based CRUD (single page approach)
- Auto refresh after every operation
- Toast notifications for feedback
- Clean and minimal UI structure
- Project Service Layer

A centralized service handles all API communication:

- getProjects() → Fetch all projects
- createProject() → Create new project
- updateProject(id) → Update existing project
- deleteProject(id) → Remove project

All requests use a shared Axios instance with authentication headers attached automatically.

## Pages
- Login
- Signup
- Dashboard
- Projects (fully implemented CRUD)
- Tasks (next implementation step)

## UI Behavior
- Users can add a project using title + description fields
- Clicking Edit loads data into the form
- Clicking Update Project saves changes
- Clicking Delete removes project after confirmation
Form resets after each successful operation
- List updates automatically after every change
Design Decisions
- Single-page CRUD approach (no navigation between create/edit pages)
- Local component state used for form handling
- Backend interaction abstracted into service layer
- Toast notifications used for user feedback
- Simple UI prioritised over styling for assessment clarity
- Projects are treated as the base entity for future Task relationships

# Frontend Tasks CRUD Setup

## Project Setup

- Tasks CRUD system implemented on frontend
- React + TypeScript using Vite
- React Router DOM configured
- Axios API service layer implemented
- React Hook Form ready (for future enhancement)
- React Toastify configured
- JWT authentication already in place
- Full CRUD flow introduced (Tasks)

## Features

- View all tasks for logged-in user
- Create new tasks
- Edit existing tasks
- Delete tasks
- Assign task to a project
- Set task status (Todo / In Progress / Done)
- Inline form-based CRUD (single page approach)
- Auto refresh after every operation
- Toast notifications for feedback
- Clean and minimal UI structure

## Task Service Layer
A centralized service handles all API communication:

- getTasks() → Fetch all tasks
- createTask() → Create new task
- updateTask(id) → Update existing task
- deleteTask(id) → Remove task

All requests use a shared Axios instance with authentication headers attached automatically.

## Pages

- Login
- Signup
- Dashboard
- Projects
- Tasks (fully implemented CRUD)

## UI Behavior

- Users can create a task using title + description
- Task must be assigned to a project
- Status can be selected (Todo / In Progress / Done)
- Clicking Edit loads data into the form
- Clicking Update Task saves changes
- Clicking Delete removes task after confirmation
- Form resets after each successful operation
- List updates automatically after every change

## Design Decisions

- Single-page CRUD approach (no navigation between create/edit pages)
- Local state used for form handling
- Backend interaction abstracted into service layer
- Toast notifications used for user feedback
- Simple UI prioritised for assessment clarity
- Tasks are linked to Projects using ObjectId relationships


