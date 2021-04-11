FROM node:15.14.0-alpine3.10

WORKDIR /app/server/

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

CMD ["npm", "start"]