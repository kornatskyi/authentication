FROM node:16-alpine3.11

WORKDIR /code

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080/tcp

# CMD node dist/server.js
CMD npm start