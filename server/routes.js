
module.exports = (app, db) => {
    app.get('/api/entities', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT nconst, Name, birthYear
             FROM Professional
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
            `SELECT nconst, Name, birthYear
             FROM Professional
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
            WHERE Type = 'movie'`
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/longest_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Runtime
                FROM "LAUREN.NEWMAN".Title
                WHERE (StartYear, Runtime) IN (
                    SELECT StartYear, MAX(Runtime) AS Runtime
                    FROM "LAUREN.NEWMAN".Title
                    WHERE Type = 'movie'
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

    app.get('/api/shortest_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Runtime
                FROM "LAUREN.NEWMAN".Title
                WHERE (StartYear, Runtime) IN (
                    SELECT StartYear, MIN(Runtime) AS Runtime
                    FROM "LAUREN.NEWMAN".Title
                    WHERE Type = 'movie'
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


    //Shows is including right now tvSeries, should tvMiniseries, tvShort ?
    app.get('/api/total_shows', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT COUNT(tconst) 
            FROM "LAUREN.NEWMAN".title
            WHERE Type = 'tvSeries'`
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/longest_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Runtime
                FROM "LAUREN.NEWMAN".Title
                WHERE (StartYear, Runtime) IN (
                    SELECT StartYear, MAX(Runtime) AS Runtime
                    FROM "LAUREN.NEWMAN".Title
                    WHERE Type = 'tvSeries'
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

    app.get('/api/shortest_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Runtime
                FROM "LAUREN.NEWMAN".Title
                WHERE (StartYear, Runtime) IN (
                    SELECT StartYear, MIN(Runtime) AS Runtime
                    FROM "LAUREN.NEWMAN".Title
                    WHERE Type = 'tvSeries'
                    AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                    GROUP BY StartYear
                )
                ORDER BY StartYear ASC`,
              )
            ;
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/highest_rated_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE (StartYear, Rating) IN (
                    SELECT StartYear, MAX(Rating) AS Rating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                    WHERE Type = 'movie'
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
                `SELECT StartYear, TitleName, Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE (StartYear, Rating) IN (
                    SELECT StartYear, MIN(Rating) AS Rating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                    WHERE Type = 'movie'
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

    app.get('/api/highest_rated_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE (StartYear, Rating) IN (
                    SELECT StartYear, MAX(Rating) AS Rating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                    WHERE Type = 'tvSeries'
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

    app.get('/api/lowest_rated_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, TitleName, Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE (StartYear, Rating) IN (
                    SELECT StartYear, MIN(Rating) AS Rating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                    WHERE Type = 'tvSeries'
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

    app.get('/api/total_actors', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT COUNT(Nconst)
            FROM "LAUREN.NEWMAN".Professional
            `
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/avg_runtime/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, ROUND(AVG(Runtime), 2)
                FROM "LAUREN.NEWMAN".Title
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Type = 'movie'
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/avg_runtime_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, ROUND(AVG(Runtime), 2)
                FROM "LAUREN.NEWMAN".Title
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Type = 'tvSeries'
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/avg_rating/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, ROUND(AVG(Rating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Type = 'movie'
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/avg_rating_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, ROUND(AVG(Rating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Type = 'tvSeries'
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/highest_actor/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, Name, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, Name
                            FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                            WHERE Category = 'actor' OR Category = 'actress'
                            GROUP BY Name, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, Name
                        FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                        WHERE Category = 'actor' OR Category = 'actress'
                        GROUP BY Name, StartYear
                    )
                )
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/highest_director/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, Name, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, Nconst
                            FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                            WHERE Category = 'director'
                            GROUP BY Nconst, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, Name
                        FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                        WHERE Category = 'director'
                        GROUP BY Name, StartYear
                    )
                )
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/highest_writer/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, Name, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, Nconst
                            FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                            WHERE Category = 'writer'
                            GROUP BY Nconst, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, Name
                        FROM "LAUREN.NEWMAN".CastCrew NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Professional
                        WHERE Category = 'writer'
                        GROUP BY Name, StartYear
                    )
                )
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/alt_language/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, COUNT(*)
                FROM "LAUREN.NEWMAN".Title
                WHERE Tconst IN (
                    SELECT Tconst
                    FROM "LAUREN.NEWMAN".AltLanguage
                )
                AND Type = 'movie'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/alt_language_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, COUNT(*)
                FROM "LAUREN.NEWMAN".Title
                WHERE Tconst IN (
                    SELECT Tconst
                    FROM "LAUREN.NEWMAN".AltLanguage
                )
                AND Type = 'tvSeries'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/avg_rating_actors/:start/:end/:name', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, ROUND(AVG(Rating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Professional 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".CastCrew)
                NATURAL JOIN (SELECT Tconst, StartYear FROM "LAUREN.NEWMAN".Title)
                NATURAL JOIN (SELECT Tconst, Rating FROM "LAUREN.NEWMAN".Ratings)
                WHERE Name = '${req.params.name}'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY StartYear
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/roles_by_genre_actors/:start/:end/:name/:genre', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, COUNT(Tconst) AS Count
                FROM "LAUREN.NEWMAN".Professional 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".CastCrew)
                NATURAL JOIN (SELECT Tconst, StartYear, Genres FROM "LAUREN.NEWMAN".Title)
                WHERE Name = '${req.params.name}'
                AND Genres LIKE '%${req.params.genre}%'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND PrimaryProfession LIKE '%act%'
                GROUP BY StartYear`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/roles_by_genre_directors/:start/:end/:name/:genre', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, COUNT(Tconst) AS Count
                FROM "LAUREN.NEWMAN".Professional 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".CastCrew)
                NATURAL JOIN (SELECT Tconst, StartYear, Genres FROM "LAUREN.NEWMAN".Title)
                WHERE Name = '${req.params.name}'
                AND Genres LIKE '%${req.params.genre}%'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY StartYear`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/stars/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, Name, Rating
                FROM Professional NATURAL JOIN CastCrew
                NATURAL JOIN (
                    SELECT StartYear, Tconst, Rating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                    WHERE (StartYear, Rating) IN (
                        SELECT StartYear, MAX(Rating) AS Rating
                        FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Ratings
                        WHERE Type = 'movie'
                        AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                        GROUP BY StartYear
                    )
                )
                WHERE Category = 'actor' OR Category = 'actress'
                ORDER BY StartYear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });
};

