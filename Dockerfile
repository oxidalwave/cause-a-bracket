ARG NODE_VERSION=24
ARG BASE_IMAGE=node:${NODE_VERSION}-alpine
ARG PNPM_VERSION=10.13.1

FROM ${BASE_IMAGE} AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS development
ARG SERVICE_VITEMODE_APP="production"
ARG SERVICE_ENVFILE_APP=".env.${SERVICE_VITEMODE_APP}"

ARG SERVICE_USER_REDIS=default
ARG SERVICE_USER_AUTHDB=postgres
ARG SERVICE_HOST_NGINX=localhost

ARG SERVICE_PORT_NGINX
ARG SERVICE_DATABASE_AUTHDB
ARG SERVICE_BASE64_BETTERAUTHSECRET
ARG SERVICE_PASSWORD_REDIS
ARG SERVICE_PASSWORD_AUTHDB
ARG SERVICE_CLIENTID_DISCORD
ARG SERVICE_CLIENTSECRET_DISCORD

RUN pnpm install --frozen-lockfile

COPY . .
COPY ${SERVICE_ENVFILE_APP} .env.production
RUN pnpm build

FROM base AS production

RUN pnpm install --frozen-lockfile --prod
COPY --from=development --chown=node:node --chmod=511 /app/.output ./.output
COPY --from=development --chown=node:node --chmod=511 /app/public ./public

EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
