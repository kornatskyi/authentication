import * as emailConfirmation from "../controllers/emailConfirmation.controller";

export default (app: any) => {
  app.post("/isconfirmed", emailConfirmation.isConfirmed);

  app.get("/confirm/:token", emailConfirmation.confirm);
};
