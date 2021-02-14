#!/bin/bash

# cd into directory for backend
cd ./xmeme-backend

# Setup DB or any other environment variables
mysql -u root -pyour_password < ./db/create_meme_db.sql
cat << EOF > .env
PORT = 8081
# DATABASE CONFIG
DB_PATH=./db/memes.db
EOF

# run server
npm install
node ./db/db.js
npm start