require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const helmet = require("helmet"); //middleware that manages http header security
const csurf = require("csurf"); //figure it out latter
const MySQLStore = require("express-mysql-session")(session);

import { Request, Response } from "express";
import authorizationRoutes from "./routes/authorization.routes";
import authenticationRoutes from "./routes/authentication.routes";
import corsOptions from "./config/cors.config";
import signOutRoutes from "./routes/signOut.routes";
import emailConfirmationRoutes from "./routes/emailConfirmation.routes";
import resetPasswordRoutes from "./routes/resetPassword.routes";
import connection from "./models/db";
import userRoutes from "./routes/user.routes";
import updateCredentialsRoutes from "./routes/updateCredentials.routes";
import deleteUserRoutes from "./routes/deleteUser.routes";

var options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE,
  clearExpired: true,
  checkExpirationInterval: 90000,
};

var sessionStore = new MySQLStore(options);

const app = express();

// /* ----- Middleware ----- */
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    key: "some key",
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    httpOnly: true, // don't Let JS code access cookies
    secure: true, // only set cookies over http
    store: sessionStore,
  })
);
// app.use(csurf());
app.use(helmet()); //manage http header security
/* ----- End of a middleware ----- */

// define a route handler for the default home page
app.get("/", (req: any, res: any, next: any) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

userRoutes(app);
authenticationRoutes(app);
authorizationRoutes(app);
signOutRoutes(app);
emailConfirmationRoutes(app);
resetPasswordRoutes(app);
updateCredentialsRoutes(app);
deleteUserRoutes(app);

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  if (err) {
    console.log(err);

    if (res.statusCode === 200) res.status(500);
    res.statusMessage = err.message || "Undefined status message";

    res.send(err.message);
  } else {
    res.send("Hello");
  }
};
app.use(errorHandler);

export default app;
