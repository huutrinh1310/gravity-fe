FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG VITE_API_BASE_URL
ARG VITE_PUBLIC_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL

COPY . .
RUN bun run build:app

FROM nginxinc/nginx-unprivileged:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/main/dist/ /usr/share/nginx/html/
EXPOSE 3000
