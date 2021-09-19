import * as authenticate from "../controllers/authentication.controller";

export default (app: any) => {
  app.post("/signin", authenticate.signin);

  app.post("/signup", authenticate.signUp);
};
