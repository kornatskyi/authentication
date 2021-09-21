import { Request, Response } from "express";
import { sendResetLink } from "../sendEmail";
import User from "../models/user.model";
const jwt = require("jsonwebtoken");

export function forgotPassword(req: Request, res: Response) {
  console.log("forgot Password");

  console.log(req.body);
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
      //check password
    } else {
      sendResetLink(email);
    }
  });
}

export function resetPasswordByLink(req: Request, res: Response) {
  console.log(req.params);

  // const verification = jwt.verify(, process.env.SECRET_KEY);
  // console.log(verification);

  // User.confirmEmail(verification.userEmail, (err: Error, result: any) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(200).send();
  //   }
  // });
}
