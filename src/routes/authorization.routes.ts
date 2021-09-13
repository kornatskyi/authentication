import * as authorized from "../controllers/authorization.controller";

export default (app: any) => {
  app.get("/data", authorized.getPersonalizedData);
};
