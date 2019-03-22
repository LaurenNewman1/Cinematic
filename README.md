# SERN-Stack-Starter

quick template application to get a SERN stack application spun up quickly with basic dependancies and migrations

mySql - Express - React - NodeJS

## Setup Instructions

* make sure you have mysql installed and running - project migrations 
* navigate to project root

* install yarn
> yarn

* install node_modules
> npm run reinstall 

* update myql configuration
> open up config/default.js and update to your mysql configuration

* create the project database
> login to mysql shell with **mysql -u USERNAME -p**
> run query 'CREATE DATABASE database_for_project;'

* run migrations
> node migrations.js up

* start application
> npm run start