FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile --prefer-offline --prod && \
    pnpm cache clean && \
    pnpm run web:build

ENTRYPOINT [ "pnpm", "run", "web:start" ]
