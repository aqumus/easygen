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

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


