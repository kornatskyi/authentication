"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordByLink = exports.forgotPassword = void 0;
const sendEmail_1 = require("../utils/sendEmail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt = require("jsonwebtoken");
// Check if with this email exists and send a message to the email with reset link
function forgotPassword(req, res, next) {
    const email = req.body.email;
    user_model_1.default.findByEmail(email, (err, result) => {
        // check errors from db
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Not found User with email ${email}.`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with email " + email,
                });
            }
        }
        else {
            //sending reset link
            (0, sendEmail_1.sendResetLink)(email)
                .then(() => {
                res.status(200).send("Send you a link on the email address");
            })
                .catch(() => {
                next(new Error("Something went wrong when sending a link."));
            });
        }
    });
}
exports.forgotPassword = forgotPassword;
// take token and new password from the request body. Verify token and change user password in database.
function resetPasswordByLink(req, res, next) {
    const { password, token } = req.body;
    //Check if both password and token exists in req.body
    if (!password || !token) {
        res.status(400).send("Wrong values");
    }
    //Verify token and then use email from the token payload to identify user
    const verification = jwt.verify(token, process.env.SECRET_KEY);
    //Encrypt password
    const hash = bcryptjs_1.default.hashSync(req.body.password, 14);
    const encryptedPassword = hash;
    user_model_1.default.updatePasswordByEmail(verification.email, encryptedPassword, (err, result) => {
        // check errors from db
        if (err) {
            if (err.message === "not_found") {
                res.status(404);
                next(new Error(`Not found User with an email ${verification.email}.`));
            }
            else {
                res.status(500);
                next(new Error(`Not found User with an email ${verification.email}.`));
            }
            //check password
        }
        else {
            res
                .status(200)
                .send("Password successfully changed! Now you can login");
        }
    });
}
exports.resetPasswordByLink = resetPasswordByLink;
