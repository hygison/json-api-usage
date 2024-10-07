FROM node:20-alpine

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN apk update && apk add --no-cache make gcc g++ python3

COPY --chown=node:node . .
USER node

