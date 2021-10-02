"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const authorize = (req, res) => {
    if (req.session.user) {
        const sessionUser = req.session.user;
        user_model_1.default.findByEmail(sessionUser.email, (err, result) => {
            var _a, _b;
            // check errors from db
            if (err) {
                if (err.message === "not_found") {
                    res.status(404).send({
                        message: `Not found User with email ${sessionUser.email}.`,
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving User with email " + sessionUser.email,
                    });
                }
                //check password
            }
            else if (sessionUser.password !== result.password) {
                res.send("Incorrect session user password!!!");
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
        res.send("Not authorized");
    }
};
exports.authorize = authorize;
