import * as authorized from "../controllers/authorization.controller";

export default (app: any) => {
  app.get("/authorize", authorized.authorize);

  app.get("/user-info", authorized.userInfo);
};
