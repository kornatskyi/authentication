import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";

export const updateCredentials = (req: any, res: any, next: NextFunction) => {
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
      ? bcrypt.hashSync(req.body.password, 14)
      : req.session.user.password,
  ];

  req.session.user = { email: newEmail, name: newName, password: newPassword };

  const userWithNewCredentials = new User(newEmail, newName, newPassword);

  User.updateByEmail(
    req.session.user.email,
    userWithNewCredentials,
    (err: Error, data: any) => {
      if (err) {
        if (err.message === "not_found") {
          res.status(404);
          next(
            new Error(`Not found User with email ${req.session.user.email}.`)
          );
        } else {
          res.status(500);
          next(
            new Error(
              "Error updating User with email " + req.session.user.email
            )
          );
        }
      } else
        res.status(200).send("User credentials have been successfully updated");
    }
  );
};
