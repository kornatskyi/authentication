import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    res.status(401);
    next(new Error("You are not authorized"));
    return;
  }
  User.removeByEmail(req.session.user?.email, (err: Error, result: any) => {
    if (err) {
      res.status(500);
      next(new Error("Error when removing user"));
    } else {
      res.status(200).send("User successfully deleted.");
      req.session.destroy(() => {
        console.log("session is destroyed");
      });
    }
  });
};
