import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const login = (req: Request, res: Response) => {
  //set cookie expiression
  const hour = 3600000;
  const min = 3600000 / 60;
  const sec = 3600000 / 60 / 60;
  req.session.cookie.expires = new Date(Date.now() + 10 * sec);

  User.findByEmail(req.body.email, (err: Error, result: any) => {
    // check errors from db
    if (err) {
      if (err.message === "not_found") {
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

