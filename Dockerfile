FROM node:14-slim AS base

WORKDIR /usr/app

FROM base AS development
RUN npm install glob rimraf
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

ENTRYPOINT npm run migrate:latest & npm run start:prod
