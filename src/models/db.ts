// const mysql = require("mysql");
const { Client, Pool } = require("pg");

const credentials = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: true,
};
const pool = new Pool(credentials);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err: any, client: any) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect();

// const client = new Client(credentials);
// client.connect();

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER_NAME,
//   password: process.env.DB_USER_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

export default pool;
