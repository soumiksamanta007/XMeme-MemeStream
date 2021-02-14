#!/bin/bash

sudo apt-get update && sudo apt-get upgrade -y

# Any installation related commands
export DEBIAN_FRONTEND=noninteractive

# Install MySQL
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password your_password'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password your_password'
sudo apt-get -y install mysql-server

# Install nodejs 15
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

# Add configurations
sudo ufw allow 8081