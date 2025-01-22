# Easygen

This project is built with Nx to create a monorepo for a NestJS backend and NextJS based frontend.
The goal is to create a simple and easy to use Auth based API and a UI demo.

### Future plans

- [ ] Configure NestJS to use Swc
- [ ] Export nest API types to frontend using swagger and openapi-generator
- [ ] Configure login workflow to use cookie based authentication
- [ ] Add API documentation
- [ ] Add CI/CD

### Prerequisites

- Node 18+
- Nx 20+
- Docker

### Setup

1. Clone the repository
2. Run `npm install`
3. Run `npx nx dev ui` (this will start the NextJS frontend)
4. Run `npx nx dev server` (this will start the NestJS backend)

### Build

To build the project, run `npx nx build server` (this will build the NestJS backend) and `npx nx build ui` (this will build the NextJS frontend).

### Run

To run the project, run `npx nx serve server` (this will start the NestJS backend) and `npx nx start ui` (this will start the NextJS frontend).

To see all available targets to run for a project, run:
"npx nx show project <app-name>

```sh
npx nx show project ui
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Libraries Used

#### Frontend

- Next.js based app that uses server side rendering
- Tanstack React query for making API queries that also provides us with client side caching and retry mechanism
- React hooks form to handle form state and validation
- Zod for schema based data validation
- TailwindCSS for styling
- Shadcn UI for UI components

- [NestJS](https://nx.dev/packages/nest?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [NextJS](https://nx.dev/packages/next?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

#### Backend

- NestJS based API server
- Fastify for the HTTP server
- Passport for authentication - local and JWT strategies
- Mongoose ORM for MongoDB integration
- Fastify session for session management
- Fastify cookie for cookie management
