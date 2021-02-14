FROM node:15

# Create app directory
WORKDIR /usr/src/xmeme_app

# Install app dependencies
COPY ./xmeme-backend/package*.json ./

RUN npm install

# Bundle app source
COPY ./xmeme-backend/ .

EXPOSE 8081

CMD [ "node", "./index.js" ]