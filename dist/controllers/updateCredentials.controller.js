"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCredentials = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const updateCredentials = (req, res, next) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    // Check if body properties are filed, if not put session values instead
    const [newEmail, newName, newPassword] = [
        req.body.email || req.session.user.email,
        req.body.name || req.session.user.name,
        req.body.password
            ? bcryptjs_1.default.hashSync(req.body.password, 14)
            : req.session.user.password,
    ];
    req.session.user = { email: newEmail, name: newName, password: newPassword };
    const userWithNewCredentials = new user_model_1.default(newEmail, newName, newPassword);
    user_model_1.default.updateByEmail(req.session.user.email, userWithNewCredentials, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404);
                next(new Error(`Not found User with email ${req.session.user.email}.`));
            }
            else {
                res.status(500);
                next(new Error("Error updating User with email " + req.session.user.email));
            }
        }
        else
            res.status(200).send("User credentials have been successfully updated");
    });
};
exports.updateCredentials = updateCredentials;
