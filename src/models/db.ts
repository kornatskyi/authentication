const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createPool({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER_NAME,
    password: dbConfig.USER_PASSWORD,
    database: dbConfig.DATABASE,
});

module.exports = connection;
