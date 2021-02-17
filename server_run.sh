#!/bin/bash

# cd into directory for backend
cd ./xmeme-backend

# install dependencies
sudo npm install sqlite3
sudo npm install express
sudo npm install

# Setup DB or any other environment variables
cat << EOF > .env
PORT = 8081
# DATABASE CONFIG
DB_PATH=./db/memes.db
EOF

# create db and define schema
node ./db/db.js

# run server
npm start