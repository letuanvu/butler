FROM node:16.17.0
COPY package*.json ./
RUN apt update && \
 apt install -y curl unzip && \
 npm install && \
 npm install -g nodemon
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3000
CMD npm start
