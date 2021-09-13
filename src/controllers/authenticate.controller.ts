import User from "../models/user.model";

export const login = (req: any, res: any) => {
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
    } else if (req.body.password !== result.password) {
      res.send("Incorrect password!!!");
    } else {
      res.cookie("sesionId", result.id);
      res.send("User " + result.name + " is authorized!");
    }
  });
};
