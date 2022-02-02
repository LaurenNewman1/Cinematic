const oracledb = require('oracledb');
const oracleConfig = require('../config/default').orcl;
const instantclient = require('../config/default').instantclient;

let ConnectToOracle = async () => {
    try {
        oracledb.initOracleClient({libDir: instantclient.path});
        connection = await oracledb.getConnection(oracleConfig);
        console.log('Successfully connected to database');
        return connection;
    } catch (err) {
        console.error(err.message);
    }
};



module.exports = {
    ConnectToOracle: ConnectToOracle
}