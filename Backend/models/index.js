var mysql = require('mysql')
const createTablesquery = require('./init')

const { sql_host, sql_port, sql_user, sql_password, sql_database, sql_connectionLimit } = require('../config');

const pool = mysql.createPool({

    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: sql_host,
    port: sql_port,
    user: sql_user,
    password: sql_password,
    database: sql_database,
    multipleStatements: true
});

// connect to database

pool.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database successfully")
});



module.exports = pool;

