FROM node:16-alpine3.11

WORKDIR /mnt/journal-app

COPY package*.json ./

COPY . .

RUN apk add nano

EXPOSE 6006

ENTRYPOINT  npm i && npm start