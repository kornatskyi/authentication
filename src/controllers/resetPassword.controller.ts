import { NextFunction, Request, Response } from "express";
import { sendResetLink } from "../utils/sendEmail";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
const jwt = require("jsonwebtoken");

// Check if with this email exists and send a message to the email with reset link
export function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body.email;

  User.findByEmail(email, (err: Error, result: any) => {
    // check errors from db
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + email,
        });
      }
    } else {
      //sending reset link
      sendResetLink(email)
        .then(() => {
          res.status(200).send("Send you a link on the email address");
        })
        .catch(() => {
          next(new Error("Something went wrong when sending a link."));
        });
    }
  });
}

// take token and new password from the request body. Verify token and change user password in database.
export function resetPasswordByLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, token } = req.body;

  //Check if both password and token exists in req.body
  if (!password || !token) {
    res.status(400).send("Wrong values");
  }

  //Verify token and then use email from the token payload to identify user
  const verification = jwt.verify(token, process.env.SECRET_KEY);

  //Encrypt password
  const hash = bcrypt.hashSync(req.body.password, 14);
  const encryptedPassword = hash;

  User.updatePasswordByEmail(
    verification.email,
    encryptedPassword,
    (err: Error, result: any) => {
      // check errors from db
      if (err) {
        if (err.message === "not_found") {
          res.status(404);
          next(
            new Error(`Not found User with an email ${verification.email}.`)
          );
        } else {
          res.status(500);
          next(
            new Error(`Not found User with an email ${verification.email}.`)
          );
        }
        //check password
      } else {
        res
          .status(200)
          .send("Password successfully changed! Now you can login");
      }
    }
  );
}
