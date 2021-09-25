import * as signOut from "../controllers/signOut.controller";

export default (app: any) => {
  app.get("/signOut", signOut.signOut);
};
