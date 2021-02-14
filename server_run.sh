#!/bin/bash

# cd into directory for backend
cd ./xmeme-backend

# Setup DB or any other environment variables
cat << EOF > .env
PORT = 8081
# DATABASE CONFIG
DB_PATH=./db/memes.db
EOF

sudo su
sudo groupadd mygroup
sudo usermod -a -G mygroup root
sudo usermod -a -G mygroup ubuntu
sudo chgrp -R mygroup /path/to/the/directory
sudo chmod -R 777 /path/to/the/directory
npm install
node ./db/db.js

# run server
npm start