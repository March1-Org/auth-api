# API Microservice Template

## Overview

Microservice template for creating a RESTful API using the Elysia framework.

## Features

- **Elysia Framework**: A lightweight framework for building APIs.
- **Bun** A CLI tool for generating and managing Javascript/Typescript projects.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Docker**: A containerization platform that simplifies the deployment process.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Drizzle**: A lightweight ORM for Node.js.
- **Redis**: An open-source, in-memory data structure store.

## Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bonzo4/march1-microservice-template.git
cd march1-microservice-template
```

2. Install the dependencies:

```bash
bun install
```

3. Set up the environment variables:

```bash
cp env.example .env
```

4. Start the development server:

```bash
bun run dev
```

5. Start the production server:

```bash
bun run start
```

## Project Structure

```
.
├── .github
│   └── meta
│       └── _journal.json
│       └── 0000_snapshot.json
│   └── 0000_create_table.sql
├── drizzle
│   └── meta
│       └── _journal.json
│       └── 0000_snapshot.json
│   └── 0000_create_table.sql
├── src
│   ├── config
│   │   └── index.ts
│   ├── db
│   │   ├── schema
│   │   │   └── index.ts
│   │   │   └── users.ts
│   │   └── cache.ts
│   │   └── index.ts
│   ├── handlers
│   │   └── users
│   │   │   └── deleteUser.ts
│   │   │   └── insertUser.ts
│   │   │   └── selectUser.ts
│   │   │   └── selectUsers.ts
│   │   │   └── updateUser.ts
│   │   └── checkAuthorization.ts
│   ├── routes
│   │   └── userRoutes.ts
│   ├── utils
│   │   ├── schema
│   │   │   └── jwt.ts
│   │   └── spread.ts
│   ├── createApp.ts
│   └── index.ts
├── test
│   ├── users
│   │   └── authorization.test.ts
│   │   └── delete.test.ts
│   │   └── get.test.ts
│   │   └── getAll.test.ts
│   │   └── patch.test.ts
│   │   └── post.test.ts
│   ├── utils
│   │   └── setup.ts
│   └── setup.sh
│   └── teardown.sh
├── .env
├── .gitignore
├── bun.lock
├── bunfig.toml
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── env.example
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
└── tsconfig.types.json
```

## Configuration

- Environment variables:
  - `NODE_ENV`: The environment mode (development, production, test).
  - `PORT`: The port number that the server will run on.
  - `JWT_SECRET`: The secret key for generating JWT tokens.
  - `AUTH_API_PASSWORD`: The password for accessing the API.
  - `POSTGRES_HOST`: The host of the PostgreSQL database.
  - `POSTGRES_PORT`: The port of the PostgreSQL database.
  - `POSTGRES_USER`: The username of the PostgreSQL database.
  - `POSTGRES_PASSWORD`: The password of the PostgreSQL database.
  - `POSTGRES_DB`: The name of the PostgreSQL database.
  - `REDIS_HOST`: The host of the Redis server.
  - `REDIS_PORT`: The port of the Redis server.
  - `REDIS_PASSWORD`: The password of the Redis server.
  - `REDIS_DB`: The name of the Redis database.

## Testing

To run the tests, use the following command:

```bash
bun run test:integrated
```

## Deployment

To deploy the application, use the following command:

```bash
docker-compose up
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Elysia](https://elysiajs.com/)
- [Bun](https://bun.sh/)
- [Drizzle](https://orm.drizzle.team/)
