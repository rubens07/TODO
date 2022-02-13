FROM node:17-alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
