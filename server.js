const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Configuration = require('./config/default');
const pkg = require('./package.json');
const port = Configuration.application.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let logServerMessage = msg => {
  console.log(`${pkg.name} v${pkg.version} :: ${msg}`);
};

global.logMessage = logServerMessage;


app.get('/api/ekg', (req, res) => {
    let payload = {
        name: pkg.name,
        version: pkg.version
    };
    res.send({body:payload});
});

const routes = require('./server/routes');
routes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));