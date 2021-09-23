import * as authenticate from "../controllers/authentication.controller";

export default (app: any) => {
  app.post("/signin", authenticate.signIn);

  app.post("/signup", authenticate.signUp);
};
