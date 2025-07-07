FROM node:24-alpine AS builder
WORKDIR /build

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --prefer-offline --prod && \
    pnpm cache clean && \
    pnpm run web:build

FROM node:24-alpine
WORKDIR /app

COPY --chown=node:node --from=builder /build/node_modules /app/node_modules
COPY --chown=node:node --from=builder /build/.dist/server /app/.dist

ENTRYPOINT [ "node", "/app/.dist/server/index.js" ]
