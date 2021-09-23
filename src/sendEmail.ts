import User from "./models/user.model";

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
export default async function (user: User) {
  const token = jwt.sign({ userEmail: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const confirmationUrl = `http://localhost:8080/confirm/${token}`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",

    auth: {
      user: process.env.GMAIL_EMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Auth App 👻" <${process.env.GMAIL_EMAIL}>`, // sender address
    to: user.email, // list of receivers
    subject: "Email confirmation", // Subject line
    text: "Confirmation message.", // plain text body
    html: `<b>Follow this URL to confirm your email address: </b> <a href="${confirmationUrl}">${confirmationUrl}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export async function sendResetLink(email: string) {
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: 600,
  });

  const resetPasswordLink = `${process.env.FRONTEND_URL}/restore-password/${token}`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",

    auth: {
      user: process.env.GMAIL_EMAIL, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Auth App 👻" <${process.env.GMAIL_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Restore Password", // Subject line
    text: "Confirmation message.", // plain text body
    html: `<b>Follow this URL to reset your password: </b> <a href="${resetPasswordLink}">${resetPasswordLink}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
