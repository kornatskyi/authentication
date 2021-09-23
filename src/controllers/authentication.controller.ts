import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import expirationDate from "../utils/expirationDate";
import sendEmail from "../sendEmail";

export const signIn = (req: Request, res: Response, next: any) => {
  // Validate request, check if all required fields exist
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400);
    next(new Error("Empty credentials"));
    return;
  }
  const [email, password] = [req.body.email, req.body.password];

  //set cookie expiression date
  req.session.cookie.expires = expirationDate(100);

  //Search for user with provided email address in the database
  User.findByEmail(email, (err: any, result: any) => {
    //Handle database errors
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send(new Error(`Not found User with ${email} email`));
      } else {
        res
          .status(500)
          .send(new Error(`Error retrieving User with ${email} email`));
      }
      //check password
    } else if (!bcrypt.compareSync(password, result.password)) {
      res.status(401).send("Incorrect password!!!");
    } else {
      //If user authorized successfully create new session with his credentials
      req.session.user = new User(result.email, result.name, result.password);
      res.status(200).send("User " + result.name + " is authorized!");
    }
  });
};

//Expects {email: string,name: string, password: string} as a request body
export const signUp = (req: Request, res: Response, next: any) => {
  // Validate request, check if all required fields exist
  if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send(new Error("Empty credentials"));
  }

  //Encrypt user password to store in database
  const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;

  // Create a User object
  const user = new User(req.body.email, req.body.name, req.body.password);

  // Create new user in the database
  User.create(user, (err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      //Send confirmation link to provided email address
      sendEmail(user)
        .then(() => {
          res.status(201);
          res.send("Please confirm you email address");
        })
        .catch(() => {
          res
            .status(200)
            .send(
              "User was created but can't send confirmation link to the given email."
            );
        });
    }
  });
};
