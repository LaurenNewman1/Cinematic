module.exports = app => {
    const usersRoute = require('./routes/entities');
    usersRoute(app);
};

