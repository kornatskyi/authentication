import * as authenticate from "../controllers/authentication.controller";

export default (app: any) => {
  app.post("/signIn", authenticate.signIn);

  app.post("/signUp", authenticate.signUp);
};
