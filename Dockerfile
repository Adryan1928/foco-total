# Multi-stage Dockerfile for Next.js + Prisma (SQLite default)
# Adjust provider in prisma/schema.prisma if you later switch to Postgres.

FROM node:20-alpine AS deps
WORKDIR /app
# Install dependencies separately to leverage layer caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM node:20-alpine AS builder
WORKDIR /app
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma client (works with SQLite or other providers)
RUN npx prisma generate
# Build Next.js app
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Dependência para engines do Prisma em Alpine
RUN apk add --no-cache openssl
# Copy built app and node_modules
COPY --from=builder /app .
# Expose Next.js port
EXPOSE 3000
# Run migrations if they exist (SQLite will just ensure file)
CMD ["sh", "-c", "npx prisma migrate deploy || echo 'No migrations to apply'; npm run start"]
