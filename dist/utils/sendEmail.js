"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetLink = void 0;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
// // create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.GMAIL_EMAIL, // generated ethereal user
//     pass: process.env.GMAIL_PASSWORD, // generated ethereal password
//   },
// });
//TODO: Error handling if email is wrong.
// async..await is not allowed in global scope, must use a wrapper
function default_1(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({ userEmail: user.email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const confirmationUrl = `http://localhost:8080/confirm/${token}`;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: `"Auth App 👻" <${process.env.GMAIL_EMAIL}>`,
            to: user.email,
            subject: "Email confirmation",
            text: "Confirmation message.",
            html: `<b>Follow this URL to confirm your email address: </b> <a href="${confirmationUrl}">${confirmationUrl}</a>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
exports.default = default_1;
function sendResetLink(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
            expiresIn: 600,
        });
        const resetPasswordLink = `${process.env.FRONTEND_URL}/restore-password/${token}`;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: `"Auth App 👻" <${process.env.GMAIL_EMAIL}>`,
            to: email,
            subject: "Restore Password",
            text: "Confirmation message.",
            html: `<b>Follow this URL to reset your password: </b> <a href="${resetPasswordLink}">${resetPasswordLink}</a>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}
exports.sendResetLink = sendResetLink;
