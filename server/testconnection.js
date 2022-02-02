const oracledb = require('oracledb');

const oracleConfig = require('../config/default').orcl;
const instantclient = require('../config/default').instantclient;

async function checkConnection() {
  try {
    oracledb.initOracleClient({libDir: instantclient.path});
    connection = await oracledb.getConnection(oracleConfig);
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close(); 
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();