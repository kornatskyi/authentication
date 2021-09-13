import express, { Request, Response } from "express";

export const getPersonalizedData = (req: Request, res: Response) => {
  console.log(req.cookies);

  if (req.cookies.sesionId ) {
  }

  res.send("user data");
};
