FROM node:14 as base

WORKDIR /usr/src/notification-service

COPY package*.json ./
COPY tsconfig.json ./
COPY job-rest-api-key.json ./
RUN npm install
EXPOSE 4000

COPY src ./src

RUN npm run build