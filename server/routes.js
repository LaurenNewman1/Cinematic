
module.exports = (app, db) => {
    app.get('/api/entities', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT nconst, primaryName, birthYear
             FROM Person
             WHERE nconst = :id`,
            ["nm0000001"],  // bind value for :id
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });
    app.get('/api/', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT nconst, primaryName, birthYear
             FROM Person
             WHERE nconst = :id`,
            ["nm0000001"],  // bind value for :id
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/total_movies', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT COUNT(tconst) 
            FROM "LAUREN.NEWMAN".title
            WHERE titletype = 'movie' GROUP BY titletype`,
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });
};

