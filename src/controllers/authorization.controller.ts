import { Request, Response } from "express";
import User from "../models/user.model";

export const getPersonalizedData = (req: Request, res: Response) => {
  if (req.session.user) {
    const sessionUser = req.session.user;
    User.findByEmail(sessionUser.email, (err: Error, result: any) => {
      // check errors from db
      if (err) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found User with email ${sessionUser.email}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with email " + sessionUser.email,
          });
        }
        //check password
      } else if (sessionUser.password !== result.password) {
        res.send("Incorrect session user password!!!");
      } else {
        res.send(
          "Data only for authorized user : " +
            sessionUser.name +
            " is authorized!"
        );
      }
    });
  } else {
    res.send("Not authorized");
  }
};
