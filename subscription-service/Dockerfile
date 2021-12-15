FROM node:14 as base

WORKDIR /usr/src/subscription-service

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
EXPOSE 4000

COPY src ./src

RUN npm run build