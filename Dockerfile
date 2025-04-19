FROM node:23-alpine AS builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY pnpm.lock.yaml .

RUN apk add git

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "run", "serve" ]