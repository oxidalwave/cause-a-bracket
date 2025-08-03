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
docker compose --profile db up -d
pnpx @better-auth/cli migrate --config ./auth-cli.ts
```

## Development

From your terminal:

```sh
pnpm install
pnpm dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Compose

Alongside the `db` Docker Compose profile, you can also run the below profiles

### `docker compose --profile devtools up`

This will start the databases alongside a suite of devtools at
`http://localhost:80/devtools/...`. These tools include:

#### Adminer

A web-based database management tool that allows you to manage relational
databases. When prompted, use "postgres" as the database type, "postgres" as
the server, "postgres" as the username, and the value of
`SERVICE_PASSWORD_POSTGRES` as the password.

#### Redis Commander

A web-based Redis management tool that allows you to view and manage Redis
databases. When prompted, use "default" as the username and the value of
`SERVICE_PASSWORD_REDIS` as the password.

### `docker compose --profile app up`

This will start the databases alongside a production-grade build of the
application at `http://localhost:80`. Devtools will be available at
`http://localhost:80/devtools/...`.
