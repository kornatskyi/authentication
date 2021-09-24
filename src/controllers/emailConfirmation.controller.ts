import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import sendEmail from "../sendEmail";
const jwt = require("jsonwebtoken");

export const isConfirmed = (req: Request, res: Response) => {
  if (req.session.user) {
    User.getEmailConfirmationStatus(
      req.session.user.email,
      (err: Error, result: any) => {
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
      }
    );
  } else {
    res.status(401).send("Session doesn't exist");
  }
};

export const sendConfirmationLink = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    res.status(401);
    next(new Error("Unauthorized for this request"));
    return;
  }
  const user = req.session.user;

  sendEmail(user)
    .then(() => {
      res.status(200);
      res.send("Please confirm you email address");
    })
    .catch((err) => {
      next(new Error(err.message));
    });
  return;
};

export const confirm = (req: Request, res: Response) => {
  const verification = jwt.verify(req.params.token, process.env.SECRET_KEY);
  console.log(verification);

  User.confirmEmail(verification.userEmail, (err: Error, result: any) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
};
