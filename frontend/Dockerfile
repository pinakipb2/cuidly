FROM node:16.17-alpine

WORKDIR /user/app/frontend

COPY package*.json ./

COPY ./ ./

RUN npm install

RUN npx next telemetry disable

RUN npm run build

CMD ["npm", "start"]