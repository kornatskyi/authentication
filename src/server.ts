import { NextFunction, Request, Response } from "express";
import User from "./models/user.model";
import authenticateRoute from "./routes/authenticate.routes";
import authorizedRoute from "./routes/authorized.routes";

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");

//figure it out latter
const csurf = require("csurf");

const helmet = require("helmet"); //middleware that manage http header security

declare module "express-session" {
  export interface SessionData {
    user: User;
  }
}

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// app.use(cookieParser());
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    httpOnly: true, // don't Let JS code access cookies
    secure: true, // only set cookies over http
  })
);
// app.use(csurf());

app.user(helmet()); //manage http header security

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  console.log(req.session);

  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

require("./routes/user.routes")(app);
authenticateRoute(app);
authorizedRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
