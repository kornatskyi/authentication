"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const helmet = require("helmet"); //middleware that manages http header security
const csurf = require("csurf"); //figure it out latter
const MySQLStore = require("express-mysql-session")(session);
const authorization_routes_1 = __importDefault(require("./routes/authorization.routes"));
const authentication_routes_1 = __importDefault(require("./routes/authentication.routes"));
const cors_config_1 = __importDefault(require("./config/cors.config"));
const signOut_routes_1 = __importDefault(require("./routes/signOut.routes"));
const emailConfirmation_routes_1 = __importDefault(require("./routes/emailConfirmation.routes"));
const resetPassword_routes_1 = __importDefault(require("./routes/resetPassword.routes"));
const db_1 = __importDefault(require("./models/db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const updateCredentials_routes_1 = __importDefault(require("./routes/updateCredentials.routes"));
const deleteUser_routes_1 = __importDefault(require("./routes/deleteUser.routes"));
var sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 90000,
} /* session store options */, db_1.default);
const app = express();
// /* ----- Middleware ----- */
app.use(cors(cors_config_1.default));
// // app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(session({
    key: "some key",
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    secure: true,
    store: sessionStore,
}));
// app.use(csurf());
app.use(helmet()); //manage http header security
/* ----- End of a middleware ----- */
// define a route handler for the default home page
app.get("/", (req, res, next) => {
    console.log("ehrkweh");
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    }
    else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});
(0, user_routes_1.default)(app);
(0, authentication_routes_1.default)(app);
(0, authorization_routes_1.default)(app);
(0, signOut_routes_1.default)(app);
(0, emailConfirmation_routes_1.default)(app);
(0, resetPassword_routes_1.default)(app);
(0, updateCredentials_routes_1.default)(app);
(0, deleteUser_routes_1.default)(app);
const errorHandler = (err, req, res, next) => {
    if (err) {
        res.statusMessage = err.message || "Undefined status message";
        res.send(err.message);
    }
    else {
        res.send("Hello");
    }
};
app.use(errorHandler);
exports.default = app;
