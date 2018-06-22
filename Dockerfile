FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
RUN npm i -g serve
RUN apt-get update
RUN apt-get install -y ruby-dev gcc automake libtool rubygems build-essential
RUN apt-get install -y rubygems-integration inotify-tools
RUN gem install sass -v 3.5.6

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
