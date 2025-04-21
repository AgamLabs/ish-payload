# Base image
FROM node:23.11-slim AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Declare build-time arguments
ARG COMPANY_NAME
ARG TWITTER_CREATOR
ARG TWITTER_SITE
ARG SITE_NAME
ARG PAYLOAD_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG PAYLOAD_PUBLIC_DRAFT_SECRET
ARG NEXT_PRIVATE_DRAFT_SECRET
ARG PAYLOAD_SECRET
ARG NEXT_PRIVATE_SECRET
ARG POSTGRES_URL
ARG BLOB_READ_WRITE_TOKEN
ARG REVALIDATION_KEY
ARG NEXT_PRIVATE_REVALIDATION_KEY
ARG SMTP_FROM_NAME
ARG SMTP_FROM_ADDRESS
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USER
ARG SMTP_PASS
ARG ADMIN_EMAIL

# Set environment variables
ENV COMPANY_NAME=${COMPANY_NAME} \
    TWITTER_CREATOR=${TWITTER_CREATOR} \
    TWITTER_SITE=${TWITTER_SITE} \
    SITE_NAME=${SITE_NAME} \
    PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL} \
    NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL} \
    PAYLOAD_PUBLIC_DRAFT_SECRET=${PAYLOAD_PUBLIC_DRAFT_SECRET} \
    NEXT_PRIVATE_DRAFT_SECRET=${NEXT_PRIVATE_DRAFT_SECRET} \
    PAYLOAD_SECRET=${PAYLOAD_SECRET} \
    NEXT_PRIVATE_SECRET=${NEXT_PRIVATE_SECRET} \
    POSTGRES_URL=${POSTGRES_URL} \
    BLOB_READ_WRITE_TOKEN=${BLOB_READ_WRITE_TOKEN} \
    REVALIDATION_KEY=${REVALIDATION_KEY} \
    NEXT_PRIVATE_REVALIDATION_KEY=${NEXT_PRIVATE_REVALIDATION_KEY} \
    SMTP_FROM_NAME=${SMTP_FROM_NAME} \
    SMTP_FROM_ADDRESS=${SMTP_FROM_ADDRESS} \
    SMTP_HOST=${SMTP_HOST} \
    SMTP_PORT=${SMTP_PORT} \
    SMTP_USER=${SMTP_USER} \
    SMTP_PASS=${SMTP_PASS} \
    ADMIN_EMAIL=${ADMIN_EMAIL} \
    NODE_ENV=production

# Builder stage
FROM base AS builder
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package*.json pnpm*.yaml ./
RUN pnpm install

# Copy source code and build
COPY . .
RUN pnpm build

# Runtime stage
FROM base AS runtime
WORKDIR /home/node/app

# Copy package files and install production dependencies
COPY package*.json pnpm*.yaml ./
RUN pnpm install --prod && pnpm store prune

# Option 1: Install cross-env if needed
RUN pnpm add cross-env --prod

# Copy built files from builder
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
# Add any other necessary built files

# Set non-root user
RUN chown -R node:node /home/node/app
USER node

EXPOSE 3000
CMD ["pnpm", "start"]