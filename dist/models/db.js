"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE,
});
exports.default = connection;
