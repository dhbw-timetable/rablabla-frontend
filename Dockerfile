FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir -p /usr/src/app/build/keys && apt-get update && npm install && npm i -g serve
RUN apt-get install -y ruby-dev gcc automake libtool rubygems build-essential && apt-get install -y rubygems-integration inotify-tools && gem install sass -v 3.5.6

COPY . .
RUN npm run build

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
