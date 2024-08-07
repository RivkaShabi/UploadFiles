
FROM node:16-alpine AS build-backend

WORKDIR /thomas/src/app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main"]