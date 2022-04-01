
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

    app.get('/api/longest_movies', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1
                INNER JOIN
                ( SELECT startyear, MAX(runtimeminutes) AS maxRuntime
                  FROM "LAUREN.NEWMAN".title
                  GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'movie' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                ORDER BY startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/shortest_movies', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1
                INNER JOIN
                ( SELECT startyear, MIN(runtimeminutes) AS maxRuntime
                  FROM "LAUREN.NEWMAN".title
                  GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'movie' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                ORDER BY startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });


    //Shows is including right now tvSeries, should tvMiniseries, tvShort ?
    app.get('/api/total_shows', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT COUNT(tconst) 
            FROM "LAUREN.NEWMAN".title
            WHERE titletype = 'tvSeries' GROUP BY titletype`,
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/longest_shows', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1
                INNER JOIN
                ( SELECT startyear, MAX(runtimeminutes) AS maxRuntime
                  FROM "LAUREN.NEWMAN".title
                  GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'tvSeries' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                ORDER BY startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/shortest_shows', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1
                INNER JOIN
                ( SELECT startyear, MIN(runtimeminutes) AS maxRuntime
                  FROM "LAUREN.NEWMAN".title
                  GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'tvSeries' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                ORDER BY startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/highest_rated_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, PrimaryTitle, AverageRating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE (StartYear, AverageRating) IN (
                    SELECT StartYear, MAX(AverageRating) AS AverageRating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                    WHERE Tconst NOT IN (
                        SELECT ParentTconst AS Tconst
                        FROM "LAUREN.NEWMAN".Episode
                    )
                    AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                    GROUP BY StartYear
                )
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/lowest_rated_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, PrimaryTitle, AverageRating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE (StartYear, AverageRating) IN (
                    SELECT StartYear, MIN(AverageRating) AS AverageRating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                    WHERE Tconst NOT IN (
                        SELECT ParentTconst AS Tconst
                        FROM "LAUREN.NEWMAN".Episode
                    )
                    AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                    GROUP BY StartYear
                )
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });
};

