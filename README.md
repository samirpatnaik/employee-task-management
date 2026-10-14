# Employee & Task Management System

A full-stack web application for managing employee records and organizing tasks, built with the MEAN stack — MongoDB, Express.js, Angular, and Node.js.

**Status:** 🚧 Under active development

## Overview

The Employee & Task Management System is a full-stack project designed to bring employee management and task tracking into a single web application.

The project focuses on building a maintainable application with a modular Angular frontend, a TypeScript-based Node.js backend, RESTful APIs, request validation, and structured error handling.

This project is also an opportunity to explore modern development practices, software architecture, testing, and AI-assisted coding workflows.

## Technology Stack

### Frontend
- Angular
- TypeScript
- SCSS
- Angular Router
- HTTP-based REST API integration
- Component-based application architecture

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Request validation
- Centralized error handling
- RESTful API architecture

### Development Tools
- Git and GitHub
- Visual Studio Code
- npm
- Prettier

## Project Structure

```text
employee-task-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       └── features/
│   │           ├── employees/
│   │           └── tasks/
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## Current Features and Implementation

The application is being developed incrementally.

The current codebase includes:

- Employee-related models, services, controllers, routes, and validation.
- Task-related models, services, controllers, routes, and validation.
- Angular employee list, details, and form components.
- Angular task-list functionality.
- REST API integration between the frontend and backend.
- Backend request-validation middleware and centralized error handling.
- Unit-test files for selected frontend components and services.

The completeness and runtime behavior of individual features are still being verified.

## Getting Started

### Prerequisites

Install the following tools before running the application:

- Node.js and npm
- MongoDB, running locally or through an accessible MongoDB service
- Angular CLI compatible with the version specified by the project
- Git

### 1. Clone the repository

```bash
git clone https://github.com/samirpatnaik/employee-task-management.git
cd employee-task-management
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as a reference.

Configure the environment variables required by the backend, including the MongoDB connection string and server port. Use your actual variable names as defined in the application.

### 3. Start the backend

Check the scripts available in `backend/package.json`:

```bash
npm run
```

Run the appropriate development script listed there.

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run
```

Run the appropriate development script listed in `frontend/package.json`.

The exact commands and configuration may evolve as development progresses.

## Development Goals

Planned development and improvement areas include:

- Completing employee management workflows.
- Completing task management workflows.
- Strengthening reactive forms and client-side validation.
- Improving loading, error, and empty states.
- Expanding unit and integration test coverage.
- Improving API consistency and application reliability.
- Reviewing security, configuration, and error handling.
- Documenting API endpoints and deployment procedures.

These goals will be updated as implementation progresses.

## Development Practices

The project aims to follow these practices:

- Separation of concerns between controllers, services, models, and routes.
- Type-safe development with TypeScript.
- Validation of incoming API requests.
- Centralized backend error handling.
- Reusable Angular components and services.
- Version control with Git.
- Incremental implementation and testing.

## Security Notes

- Never commit real `.env` files, passwords, API keys, access tokens, or database credentials.
- Use `.env.example` only for placeholder configuration.
- Keep dependencies and generated build output out of version control.
- Use synthetic data for development and demonstrations.

## Project Ownership and License

This project is being developed as a personal software project.

A license has not yet been specified. Until a license is added, do not assume that others have permission to reuse, distribute, or modify the code.

## Author

**Samir Kumar Patnaik**

- GitHub: [samirpatnaik](https://github.com/samirpatnaik)
- Portfolio: [samirpatnaik.github.io](https://samirpatnaik.github.io/)
- LinkedIn: [Samir Kumar Patnaik](https://www.linkedin.com/in/samir-kumar-patnaik/)

---

*This project is under active development. Features, setup instructions, and architecture may change as implementation progresses.*
