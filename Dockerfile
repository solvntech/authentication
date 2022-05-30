FROM node:16.13.1-alpine
WORKDIR /usr/src/app
RUN rm -rf node_modules
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
