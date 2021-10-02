"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = void 0;
const signOut = (req, res, next) => {
    console.log(req.session);
    req.session.destroy(() => {
        res.send("Sign out");
    });
};
exports.signOut = signOut;
