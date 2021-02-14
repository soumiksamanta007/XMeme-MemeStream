#!/bin/bash

# cd into directory for backend
cd ./xmeme-backend

# Setup DB or any other environment variables
cat << EOF > .env
PORT = 8081
# DATABASE CONFIG
DB_PATH=./db/memes.db
EOF

npm install
node ./db/db.js

# run server
npm start