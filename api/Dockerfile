FROM node:alpine
EXPOSE 8080
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . ./

ENTRYPOINT ["npm", "start"]