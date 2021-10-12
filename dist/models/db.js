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
// console.log("🚀 ~ connection", connection);
// var getConnection = function (callback: any) {
//   connection.getConnection(function (err: any, connection: any) {
//     console.log(connection);
//     callback(err, connection);
//   });
// };
// getConnection((err: any, connection: any) => {
//   console.log(connection);
// });
exports.default = connection;
