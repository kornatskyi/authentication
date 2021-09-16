import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import expirationDate from "../utils/expirationDate";

export const signin = (req: Request, res: Response, next: any) => {
  const [email, password] = [req.body.email, req.body.password];

  if (!email || !password) {
    res.status(403);
    next(new Error("Not all credentials have been input"));
    return;
  }

  //set cookie expiression date
  req.session.cookie.expires = expirationDate(1);

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
