"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.sendConfirmationLink = exports.isConfirmed = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const jwt = require("jsonwebtoken");
const isConfirmed = (req, res) => {
    if (req.session.user) {
        user_model_1.default.getEmailConfirmationStatus(req.session.user.email, (err, result) => {
            if (err) {
                if (err.message === "not_found") {
                    res.status(404).send({
                        message: `Not found  user with ${req.params.customerId} email`,
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving the confirmation status of " +
                            req.params.customerId,
                    });
                }
            }
            else {
                if (result.confirmed !== 0) {
                    res.status(200);
                    res.send(true);
                }
                else {
                    res.status(200);
                    res.send(false);
                }
            }
        });
    }
    else {
        res.status(401).send("Session doesn't exist");
    }
};
exports.isConfirmed = isConfirmed;
const sendConfirmationLink = (req, res, next) => {
    if (!req.session.user) {
        res.status(401);
        next(new Error("Unauthorized for this request"));
        return;
    }
    const user = req.session.user;
    (0, sendEmail_1.default)(user)
        .then(() => {
        res.status(200);
        res.send("We sent you a mail with instructions on how to confirm your email address. It may take a couple of minutes");
    })
        .catch((err) => {
        next(new Error(err.message));
    });
    return;
};
exports.sendConfirmationLink = sendConfirmationLink;
const confirm = (req, res) => {
    const verification = jwt.verify(req.params.token, process.env.SECRET_KEY);
    console.log(verification);
    user_model_1.default.confirmEmail(verification.userEmail, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send();
        }
    });
};
exports.confirm = confirm;
