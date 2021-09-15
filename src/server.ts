import { NextFunction, Request, Response } from "express";
import User from "./models/user.model";
import authorizationRoutes from "./routes/authorization.routes";
import authenticationRoutes from "./routes/authentication.routes";
import corsOptions from "./config/corsOptions";

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();

//figure it out latter
const csurf = require("csurf");

const helmet = require("helmet"); //middleware that manage http header security

declare module "express-session" {
  export interface SessionData {
    user: User;
  }
}

const app = express();

app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json()); // <--- Here

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

app.use(helmet()); //manage http header security

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
authenticationRoutes(app);
authorizationRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
