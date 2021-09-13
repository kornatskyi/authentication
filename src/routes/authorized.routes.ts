import * as authorized from "../controllers/authorized.controller";

export default (app: any) => {
  app.get("/data", authorized.getPersonalizedData);
};
