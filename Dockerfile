FROM node:22-alpine AS base
WORKDIR /usr/src/app

# Local development target with hot-reload
FROM base AS local
RUN apk add --no-cache python3 make g++ openssl
COPY package*.json ./
COPY patches ./patches
RUN npm ci --legacy-peer-deps --force
RUN touch ormlogs.log
COPY . .
ARG APP_PORT=3000
EXPOSE ${APP_PORT}
CMD ["npm", "run", "start:dev"]

# Mau deployment target (dev/stg/prod)
FROM node:22-bullseye-slim AS mau
WORKDIR /usr/src/app
COPY package*.json ./
COPY patches ./patches
RUN apt-get update && apt-get install -y curl python3 make g++ openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci --no-audit --legacy-peer-deps
RUN touch ormlogs.log
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]

