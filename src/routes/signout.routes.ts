import * as signout from "../controllers/signout.controller";

export default (app: any) => {
  app.get("/signout", signout.signout);
};
