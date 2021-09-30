"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const deleteUser = (req, res, next) => {
    var _a;
    if (!req.session.user) {
        res.status(401);
        next(new Error("You are not authorized"));
        return;
    }
    user_model_1.default.removeByEmail((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email, (err, result) => {
        if (err) {
            res.status(500);
            next(new Error("Error when removing user"));
        }
        else {
            res.status(200).send("User successfully deleted.");
            req.session.destroy(() => {
                console.log("session is destroyed");
            });
        }
    });
};
exports.deleteUser = deleteUser;
