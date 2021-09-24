import * as updateCredentials from "../controllers/updateCredentials.controller";

export default (app: any) => {
  app.put("/update", updateCredentials.updateCredentials);
};
