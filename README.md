# Easygen

This project is built with Nx to create a monorepo for a NestJS backend and NextJS based frontend.
The goal is to create a simple and easy to use Auth based API and a UI demo.

### Prerequisites

- Node 20+
- Git

### Setup

1. Clone the repository
2. Run `npm install`
3. Create `.env.local` in apps/ui and add `API_URL=http://localhost:3500` env var to set backend server API
4. Create `.env.local` in apps/server and add `JWT_SECRET` and `SESSION_SECRET` env var with randomly generated secret keys (To generate random secret keys run `openssl rand -base64 36` in mac terminal)
5. Run `npx nx dev ui` (this will start the NextJS frontend)
6. Run `npx nx dev server` (this will start the NestJS backend)

### Build

To build the project

```sh
npx nx build server
```

this will build the NestJS backend

```sh
npx nx build ui
```

this will build the NextJS frontend

### Run

To run the Nestjs backend server

```sh
npx nx serve server
```

To run the NextJS frontend

```sh
npx nx start ui
```

### Hosting

- To host server, make sure to add `JWT_SECRET` and `SESSION_SECRET`, `MONGODB_URI` environment variables
- To host UI, make sure to add `API_URL` environment variable that would point to hosted server URL

### Miscellaneous

To see all available targets to run for a project, run:
"npx nx show project <app-name>

```sh
npx nx show project ui
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

### Libraries Used

#### Frontend

- Next.js based app that uses server side rendering
- Tanstack React query for making API queries that also provides us with client side caching and retry mechanism
- React hooks form to handle form state and validation
- Zod for schema based data validation
- TailwindCSS for styling
- Shadcn UI for UI components

#### Backend

- NestJS based API server
- Passport for authentication - local and JWT strategies
- Mongoose ORM for MongoDB integration

### Scope of improvement

- [ ] Configure login workflow to use cookie based authentication and session management
- [ ] Stateless session management using mongoose-connect-session
- [ ] Switch to fastify for the HTTP server
- [ ] Configure NestJS to use Swc
- [ ] Export nest API types to frontend using swagger and openapi-generator
- [ ] Add API documentation
- [ ] Add CI/CD
- [ ] Add unit and integration tests
- [ ] Add E2E tests
