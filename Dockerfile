ARG NODE_VERSION=24
ARG IMAGE_DISTRO=alpine
ARG BASE_IMAGE=node:${NODE_VERSION}-${IMAGE_DISTRO}
ARG PNPM_VERSION=10.14.0

FROM ${BASE_IMAGE} AS base
ARG PORT=3000
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS development
ARG SERVICE_VITEMODE_APP="production"
ARG SERVICE_ENVFILE_APP=".env.${SERVICE_VITEMODE_APP}"

ARG SERVICE_USER_REDIS=default
ARG SERVICE_HOST_REDIS
ARG SERVICE_PASSWORD_REDIS
ARG SERVICE_PORT_REDIS=6379
ARG SERVICE_INDEX_REDIS=0

ARG SERVICE_CLIENTID_DISCORD

ARG SERVICE_CLIENTSECRET_DISCORD

ARG SERVICE_BASE64_BETTERAUTHSECRET

ARG SERVICE_HOST_POSTGRES
ARG SERVICE_USER_POSTGRES=postgres
ARG SERVICE_PASSWORD_POSTGRES
ARG SERVICE_DATABASE_POSTGRES=${SERVICE_USER_POSTGRES}

ARG SERVICE_FQDN_APP="http://localhost:${PORT}"

ARG COOLIFY_URL
ARG COOLIFY_FQDN
ARG COOLIFY_RESOURCE_UUID
ARG COOLIFY_BRANCH
ARG COOLIFY_CONTAINER_NAME

RUN pnpm install --frozen-lockfile

COPY . .
COPY ${SERVICE_ENVFILE_APP} .env.production
RUN pnpm build

FROM base AS production
ARG PORT=3000

RUN pnpm install --frozen-lockfile --prod
COPY --from=development --chown=node:node --chmod=511 /app/.output ./.output
COPY --from=development --chown=node:node --chmod=511 /app/public ./public

EXPOSE ${PORT}
ENTRYPOINT ["node", ".output/server/index.mjs"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:${PORT}/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
