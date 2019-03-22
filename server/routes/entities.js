


const db = require('../db');

module.exports = (app) => {
    app.get('/api/entities', (req, res) => {
        global.logMessage(`GET /api/entities`);
    });

    app.get('/api/entity/:id', (req, res) => {
        global.logMessage(`GET ONE /api/entity/${req.params.id}`);
    });

    app.post('/api/entities', (req, res) => {
        global.logMessage(`POST /api/entities`);
    });

    app.put('/api/entities/:id', (req, res) => {
        global.logMessage(`PUT /api/entities/${req.params.id}`);
    });

    app.delete('/api/entities/:id', (req, res) => {
        global.logMessage(`DELETE /api/entities/${req.params.id}`);
    });
}
