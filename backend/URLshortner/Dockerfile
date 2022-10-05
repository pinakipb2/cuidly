FROM node:16.17-alpine

WORKDIR /user/app/backend/urlshortner

COPY package*.json ./

COPY ./ ./

RUN npm install

CMD ["npm", "start"]