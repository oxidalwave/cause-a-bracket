# Welcome to Cause A Bracket!

This site is built with TanStack Router!

- [TanStack Router Docs](https://tanstack.com/router)

It's deployed automagically with Coolify!

- [Coolify](https://coolify.io/)

## Onboarding

To get started with this project, you will need to copy the `.env.example` file to `.env` and fill in the required
environment variables. The environment variables may be populated as such:

- `SERVICE_PASSWORD_REDIS` - generate with `openssl rand -base64 32`
- `SERVICE_PASSWORD_POSTGRES` - generate with `openssl rand -base64 32`
- `SERVICE_BASE64_BETTERAUTHSECRET` - generate with `openssl rand -base64 32`
- `SERVICE_CLIENTID_DISCORD` - generated
  from [the Discord Developer Portal](https://discord.com/developers/applications)
- `SERVICE_CLIENTSECRET_DISCORD` - generated
  from [the Discord Developer Portal](https://discord.com/developers/applications)

## Database Initialization

Execute the below command to start the Postgres and Redis services, alongside the development tool webapps.

```sh
docker compose --profile devtools up -d
```

Navigate to `http://localhost/devtools/adminer` to access the Adminer webapp. Sign in using the password you set as
`SERVICE_PASSWORD_POSTGRES`. The url will be "postgres", and the database and username will be "postgres". Navigate to "
Execute SQL", and run the migration found in `better-auth_migrations/2025-07-19T14-12-08.412Z.sql`. I aim to replace
this with Prisma or Drizzle or some other ORM with proper migration support in the future.

## Development

From your terminal:

```sh
pnpm install
pnpm dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Compose

Alongside the `devtools` Docker Compose profile, you can also run the `app` profile with the below command. This will
start the databases alongside a production-grade build of the application at `http://localhost:80`. Devtools will still
be available at `http://localhost:80/devtools/...`.
