ARG NODE_VERSION=24
ARG PNPM_VERSION=10.13.1

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS development
ARG VITE_VALKEY_CONNECTION_STRING
ARG URL
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_POSTGRES_URL
ARG BETTER_AUTH_DISCORD_CLIENT_ID
ARG BETTER_AUTH_DISCORD_CLIENT_SECRET

RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base AS production
RUN pnpm install --frozen-lockfile --prod
COPY --from=development --chown=node:node --chmod=511 /app/.output ./.output
COPY --from=development --chown=node:node --chmod=511 /app/public ./public

USER node
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
