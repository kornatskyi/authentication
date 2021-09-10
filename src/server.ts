import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

import * as MYSQL from './variables/mysqlCredentials';
import * as SERVER from './variables/severCredentials';


const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const connection = mysql.createConnection({
  host: MYSQL.HOST,
  port:MYSQL.PORT,
  user: MYSQL.USER_NAME,
  password: MYSQL.USER_PASSWORD,
  database: MYSQL.DATABASE,
});

connection.connect();

connection.query(
  "SHOW DATABASES",
  function (error: any, results: any, fields: any) {
    
    if (error) throw error;
    console.log("The solution is: ", results);
  }
);

connection.end();


// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});

app.post("/register", (req: any, res: any) => {
  console.log(req.body);

  res.json(req.body);
});

// start the Express server
app.listen(SERVER.PORT, () => {
  console.log(`server started at http://${SERVER.NAME}:${SERVER.PORT}`);
});
