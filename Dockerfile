# Use official Node.js LTS image
FROM node:23-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN pnpm install

# Build Payload admin panel
RUN pnpm build

# Expose the port (default Payload port)
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
