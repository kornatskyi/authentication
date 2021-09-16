import { Request, Response } from "express";

export const signout = (req: Request, res: Response, next: any) => {
  console.log(req.session);

  req.session.destroy(() => {
    res.send("Sign out");
  });
};
