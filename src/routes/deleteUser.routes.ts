import * as deleteUser from "../controllers/deleteUser.controller";

export default (app: any) => {
  app.delete("/delete", deleteUser.deleteUser);
};
