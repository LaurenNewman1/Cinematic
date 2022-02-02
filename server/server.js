const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { ConnectToOracle } = require('./db');

const Configuration = require('../config/default');
const port = Configuration.application.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let run = async() => {
    let connection = await ConnectToOracle();

    const routes = require('./routes');
    routes(app, connection);

    const server = app.listen(port, () => console.log(`Listening on port ${port}`));

    process.on('SIGTERM', async() => {
        console.log('SIGTERM signal received: closing HTTP server')
        server.close(() => {
        console.log("Server closed")
        })
        await connection.close();
        console.log("Connection to database closed")
    })
}

run();