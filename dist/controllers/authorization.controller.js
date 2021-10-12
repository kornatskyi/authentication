"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = exports.authorize = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const authorize = (req, res, next) => {
    if (req.session.user) {
        const sessionUser = req.session.user;
        user_model_1.default.findByEmail(sessionUser.email, (err, result) => {
            // check errors from db
            var _a, _b;
            if (err) {
                if (err.message === "not_found") {
                    res.status(404);
                    next(new Error(`Not found User with email ${sessionUser.email}.`));
                }
                else {
                    res.status(500);
                    next(new Error("Error retrieving User with email " + sessionUser.email));
                }
                //check password
            }
            else if (sessionUser.password !== result.password) {
                res.status(401);
                next(new Error("Incorrect session user password!!!"));
            }
            else {
                res.status(200);
                //Send not privet user credentials back to the client
                res.send({
                    email: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email,
                    name: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.name,
                });
            }
        });
    }
    else {
        res.status(401);
        next(new Error("Not authorized"));
    }
};
exports.authorize = authorize;
const userInfo = (req, res, next) => {
    if (req.session.user) {
        res.status(200);
        res.send({
            email: req.session.user.email,
            name: req.session.user.name,
        });
    }
    else {
        next(new Error("User session doesn't exist!"));
    }
};
exports.userInfo = userInfo;
