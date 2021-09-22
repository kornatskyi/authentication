import { Request, Response } from "express";
import { sendResetLink } from "../sendEmail";
import bcrypt from "bcryptjs";
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
  const { password, token } = req.body;

  if (!password || !token) {
    res.status(400).send("Wrong values");
  }

  const hash = bcrypt.hashSync(req.body.password, 14);
  const encryptedPassword = hash;

  const verification = jwt.verify(token, process.env.SECRET_KEY);
  console.log("🚀 ~ verification", verification);

  User.updatePasswordByEmail(
    verification.email,
    encryptedPassword,
    (err: Error, result: any) => {
      // check errors from db
      if (err) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${verification.email}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with email " + verification.email,
          });
        }
        //check password
      } else {
        res.status(200).send("Password successfully changes!");
      }
    }
  );

  console.log(req.params);
}
