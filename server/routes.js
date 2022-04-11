
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
            WHERE Tconst NOT IN (
                SELECT ParentTconst AS Tconst
                FROM "LAUREN.NEWMAN".Episode
            )`
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/longest_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1 INNER JOIN
               ( SELECT startyear, MIN(runtimeminutes) AS maxRuntime
                FROM "LAUREN.NEWMAN".title GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'movie' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                AND t1.StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY t1.StartYear, t1.primarytitle, t1.runtimeminutes
                ORDER BY t1.startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/shortest_movies/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1 INNER JOIN
               ( SELECT startyear, MAX(runtimeminutes) AS maxRuntime
                FROM "LAUREN.NEWMAN".title GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'movie' and t1.runtimeminutes != '\N'
                AND t1.runtimeminutes = t2.maxruntime
                AND t1.StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                GROUP BY t1.StartYear, t1.primarytitle, t1.runtimeminutes
                ORDER BY t1.startyear ASC`,
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
            WHERE Tconst IN (
                SELECT ParentTconst AS Tconst
                FROM "LAUREN.NEWMAN".Episode
            )`
        );
        res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/longest_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1 INNER JOIN
               ( SELECT startyear, MIN(runtimeminutes) AS maxRuntime
                FROM "LAUREN.NEWMAN".title GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'tvSeries' 
                AND t1.runtimeminutes = t2.maxruntime
                AND t1.StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                ORDER BY t1.startyear ASC`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            res.status(400).type('json').send(err);
        }
    });

    app.get('/api/shortest_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT t1.startyear, t1.primarytitle, t1.runtimeminutes
                FROM "LAUREN.NEWMAN".title t1 INNER JOIN
               ( SELECT startyear, MAX(runtimeminutes) AS maxRuntime
                FROM "LAUREN.NEWMAN".title GROUP BY startyear) t2
                ON t1.startyear = t2.startyear
                WHERE t1.titletype = 'tvSeries' 
                AND t1.runtimeminutes = t2.maxruntime
                AND t1.StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                ORDER BY t1.startyear ASC`,
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

    app.get('/api/highest_rated_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, PrimaryTitle, AverageRating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE (StartYear, AverageRating) IN (
                    SELECT StartYear, MAX(AverageRating) AS AverageRating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                    WHERE Tconst IN (
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

    app.get('/api/lowest_rated_shows/:start/:end', async(req, res) => {
        try {
            const data = await db.execute(
                `SELECT StartYear, PrimaryTitle, AverageRating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE (StartYear, AverageRating) IN (
                    SELECT StartYear, MIN(AverageRating) AS AverageRating
                    FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                    WHERE Tconst IN (
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

    app.get('/api/total_actors', async(req, res) => {
        try {
        const data = await db.execute(
            `SELECT COUNT(Nconst)
            FROM "LAUREN.NEWMAN".Person
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
                `SELECT StartYear, ROUND(AVG(TO_NUMBER(cast(NULLIF(runtimeminutes, '\N') AS VARCHAR(26)))), 0) AS runtime
                FROM "LAUREN.NEWMAN".Title
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Tconst NOT IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
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
                `SELECT EndYear, EndYear - StartYear AS Length
                FROM "LAUREN.NEWMAN".Title
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Tconst IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
                GROUP BY EndYear
                ORDER BY EndYear ASC`,
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
                `SELECT StartYear, ROUND(AVG(AverageRating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Tconst NOT IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
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
                `SELECT StartYear, ROUND(AVG(AverageRating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Rating
                WHERE StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND Tconst IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
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
                `SELECT StartYear, PrimaryName, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, PrimaryName
                            FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                            WHERE Category = 'actor' OR Category = 'actress'
                            GROUP BY PrimaryName, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, PrimaryName
                        FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                        WHERE Category = 'actor' OR Category = 'actress'
                        GROUP BY PrimaryName, StartYear
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
                `SELECT StartYear, PrimaryName, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, Nconst
                            FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                            WHERE Category = 'director'
                            GROUP BY Nconst, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, PrimaryName
                        FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                        WHERE Category = 'director'
                        GROUP BY PrimaryName, StartYear
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
                `SELECT StartYear, PrimaryName, tot
                FROM (
                    SELECT *
                    FROM (
                        SELECT StartYear, MAX(tot) AS tot
                        FROM (
                            SELECT COUNT(Tconst) AS tot, StartYear, Nconst
                            FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                            WHERE Category = 'writer'
                            GROUP BY Nconst, StartYear
                        )
                        GROUP BY StartYear
                    )
                    NATURAL JOIN (
                        SELECT COUNT(Tconst) AS tot, StartYear, PrimaryName
                        FROM "LAUREN.NEWMAN".Principal NATURAL JOIN "LAUREN.NEWMAN".Title NATURAL JOIN "LAUREN.NEWMAN".Person
                        WHERE Category = 'writer'
                        GROUP BY PrimaryName, StartYear
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
                    SELECT TitleID AS Tconst
                    FROM "LAUREN.NEWMAN".Alternative
                )
                AND Tconst NOT IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
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
                    SELECT TitleID AS Tconst
                    FROM "LAUREN.NEWMAN".Alternative
                )
                AND Tconst IN (
                    SELECT ParentTconst AS Tconst
                    FROM "LAUREN.NEWMAN".Episode
                )
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
                `SELECT StartYear, ROUND(AVG(AverageRating), 2) AS Rating
                FROM "LAUREN.NEWMAN".Person 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".Principal)
                NATURAL JOIN (SELECT Tconst, StartYear FROM "LAUREN.NEWMAN".Title)
                NATURAL JOIN (SELECT Tconst, AverageRating FROM "LAUREN.NEWMAN".Rating)
                WHERE PrimaryName = '${req.params.name}'
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
                FROM "LAUREN.NEWMAN".Person 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".Principal)
                NATURAL JOIN (SELECT Tconst, StartYear, Genres FROM "LAUREN.NEWMAN".Title)
                WHERE PrimaryName = '${req.params.name}'
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
                FROM "LAUREN.NEWMAN".Person 
                NATURAL JOIN (SELECT Tconst, Nconst FROM "LAUREN.NEWMAN".Principal)
                NATURAL JOIN (SELECT Tconst, StartYear, Genres FROM "LAUREN.NEWMAN".Title)
                WHERE PrimaryName = '${req.params.name}'
                AND Genres LIKE '%${req.params.genre}%'
                AND StartYear BETWEEN ${req.params.start} AND ${req.params.end}
                AND PrimaryProfession LIKE '%direct%'
                GROUP BY StartYear`,
            );
            res.status(200).type('json').send(data);
        } catch (err) {
            console.log(err);
            res.status(400).type('json').send(err);
        }
    });
};

