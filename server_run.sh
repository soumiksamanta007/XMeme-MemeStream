#!/bin/bash

# cd into directory for backend
cd ./xmeme-backend

# Setup DB or any other environment variables
mysql -u root -pyour_password < ./db/create_meme_db.sql
cat << EOF > .env
PORT=8081
# DATABASE CONFIG
DB_HOST = localhost
DB_USER = root
DB_PASS = your_password
DB_DATABASE = meme_db
EOF


# run server
npm install && npm start