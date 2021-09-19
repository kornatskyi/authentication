import * as emailConfirmation from "../controllers/emailConfirmation.controller";

export default (app: any) => {
  app.post("/isconfirmed", emailConfirmation.isEmailConfirmed);

  app.get("/confirm");
};
