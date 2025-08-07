# syntax=docker/dockerfile:1.7-labs
ARG NODE_VERSION=24
ARG IMAGE_DISTRO=alpine
ARG BASE_IMAGE=node:${NODE_VERSION}-${IMAGE_DISTRO}
ARG PNPM_VERSION=10.14.0

FROM ${BASE_IMAGE} AS base
ARG PORT=3000
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS builder
ARG SERVICE_VITEMODE_APP="production"
ARG SERVICE_ENVFILE_APP=".env.${SERVICE_VITEMODE_APP}"

RUN pnpm install --frozen-lockfile

COPY --exclude=.env.* \
    --exclude=.env \
    --exclude=node_modules \
    --exclude=.storybook \
    --exclude=idea \
    --exclude=.github \
    --exclude=.compose \
    --exclude=.nitro \
    --exclude=.vscode \
    --exclude=.output \
    --exclude=.git \
    . .
COPY ${SERVICE_ENVFILE_APP} .env.production
RUN pnpm build

FROM base

RUN pnpm install --frozen-lockfile --prod
COPY --from=builder --chown=node:node --chmod=511 /app/.output ./.output
COPY --from=builder --chown=node:node --chmod=511 /app/public ./public

EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
