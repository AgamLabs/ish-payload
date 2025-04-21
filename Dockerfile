# Base image
FROM node:23.11-slim AS base

# Builder stage
FROM base AS builder

WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy source code and build
COPY . .
RUN yarn build

# Runtime stage
FROM base AS runtime

ENV NODE_ENV=production

WORKDIR /home/node/app

# Copy only what is needed for production
COPY package*.json ./
RUN yarn install --production

# Copy built app from builder stage
COPY --from=builder /home/node/app/dist ./dist

# If your app needs public assets or config, copy them too
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/config ./config

EXPOSE 3000

CMD ["node", "dist/server.js"]