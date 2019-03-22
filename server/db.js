const mysql = require('mysql');

let ConnectToMysql = async () => {
    const mysqlConfig = require('../config/default').mysql;
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(mysqlConfig);
        conn.connect(err => {
            err ? reject(err) : resolve(conn);
        })
    });
};



module.exports = {
    ConnectToMysql: ConnectToMysql
}