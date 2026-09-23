# Stage 1: Build
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install Bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG VITE_API_BASE_URL
ARG VITE_PUBLIC_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL

# Copy source code to Docker image and build app
COPY . .
RUN bun run build

# Stage 2: Run
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_PUBLIC_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL

COPY --from=builder --chown=bun:bun /app/dist ./dist
COPY --from=builder --chown=bun:bun /app/node_modules ./node_modules
COPY --from=builder --chown=bun:bun /app/package.json ./
COPY --from=builder --chown=bun:bun /app/vite.config.ts ./
USER bun
EXPOSE 3000
CMD ["bun", "run", "start"]
