# Base = Node+pnpm
FROM node:22-alpine AS base
RUN npm i -g pnpm

# Builder
FROM base AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG APP
RUN pnpm build ${APP}

# Production
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist

ARG APP
ENV APP_MAIN_FILE=dist/apps/${APP}/main
CMD ["sh", "-c", "node ${APP_MAIN_FILE}"]
