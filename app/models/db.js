const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createPool({
    connectionLimit : 10,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    insecureAuth: true,
    charset: 'utf8mb4_unicode_ci',
});

module.exports = connection;
