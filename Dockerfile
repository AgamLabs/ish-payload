# Use official Node.js LTS image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN pnpm install

# Copy source code
COPY . .

# Build Payload admin panel
RUN pnpm build

# Expose the port (default Payload port)
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
