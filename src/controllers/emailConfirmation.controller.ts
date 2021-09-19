import { Request, Response } from "express";
import User from "../models/user.model";
const jwt = require("jsonwebtoken");

// //Sending mail with email confirmation link
// sendEmail().catch((err) => {
//     console.log(err);
//   });

export function isConfirmed(req: Request, res: Response) {
  User.getEmailConfirmationStatus(req.body.email, (err: Error, result: any) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found  user with ${req.params.customerId} email`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving the confirmation status of " +
            req.params.customerId,
        });
      }
    } else {
      if (result.confirmed !== 0) {
        res.status(200);
        res.send(true);
      } else {
        res.status(200);
        res.send(false);
      }
    }
  });
}

export function confirm(req: Request, res: Response) {
  const verification = jwt.verify(req.params.token, "secret_key");
  console.log(verification);

  User.confirmEmail(verification.userEmail, (err: Error, result: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
}
