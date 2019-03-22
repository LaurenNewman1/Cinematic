const mysql = require('mysql');
const migration = require('mysql-migrations');
const mysqlConfig = require('./config/default').mysql;

var connection = mysql.createPool(mysqlConfig);

migration.init(connection, __dirname + '/migrations');