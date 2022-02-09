# Cinematic

Web application for movie recommendations and analysis

OracleDB - Express - React - Node.js

## Setup Instructions

* make sure you have access to the Oracle database
* navigate to project root

* install yarn
> npm install yarn

* install Oracle Instant Client
> https://www.oracle.com/database/technologies/instant-client/downloads.html

* update the path to your Oracle Instant Client in config/default.js to the location on your device

* install node_modules
> npm run reinstall 

* update Oracle configuration
> open up config/default.js and update to your Oracle configuration

* connect to your UF Vpn on Cisco Anyconnect
* right click your connection in sql developer
* copy your Oracle password under the password field and check the save password box

* test the connection to the database
> npm run testconnection

* start application
> npm run start
