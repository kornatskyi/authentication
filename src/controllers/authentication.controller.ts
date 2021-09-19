import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import expirationDate from "../utils/expirationDate";
import sendEmail from "../sendEmail";

export const signin = (req: Request, res: Response, next: any) => {
  const [email, password] = [req.body.email, req.body.password];

  if (!email || !password) {
    res.status(403);
    next(new Error("Not all credentials have been input"));
    return;
  }

  console.log(expirationDate(20));

  //set cookie expiression date
  req.session.cookie.expires = expirationDate(100);

  User.findByEmail(req.body.email, (err: any, result: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.body.email,
        });
      }
      //check password
    } else if (!bcrypt.compareSync(req.body.password, result.password)) {
      res.send("Incorrect password!!!");
    } else {
      req.session.user = new User(result.email, result.name, result.password);
      res.send("User " + result.name + " is authorized!");
    }
  });
};

export const signUp = (req: Request, res: Response, next: any) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;
  // Create a User
  const user = new User(req.body.email, req.body.name, req.body.password);

  // Save User in the database
  User.create(user, (err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      sendEmail(user);
      res.status(200);
      res.send("Registered");
    }
  });
};
