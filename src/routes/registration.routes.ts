import * as registration from "../controllers/registration.controller";

export default (app: any) => {
  app.post("/register", registration.register);
};
