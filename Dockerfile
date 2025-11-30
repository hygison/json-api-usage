FROM node:22-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci --legacy-peer-deps --force

FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /usr/src/app
ARG APP_PORT=3000
ENV NODE_ENV=production \
	PORT=${APP_PORT}
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps --force
COPY --from=builder /usr/src/app/dist ./dist
RUN apk add --no-cache openssl \
	&& openssl genpkey -algorithm RSA -out private_key.pem \
	&& openssl rsa -pubout -in private_key.pem -out public_key.pem \
	&& touch ormlogs.log \
	&& chown node:node private_key.pem public_key.pem ormlogs.log \
	&& chown -R node:node /usr/src/app
USER node
EXPOSE ${APP_PORT}
CMD ["node", "dist/main"]

