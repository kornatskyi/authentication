import * as resetPassword from "../controllers/resetPassword.controller";

export default (app: any) => {
  app.post("/forgot-password", resetPassword.forgotPassword);

  app.post("/reset-password-by-link", resetPassword.resetPasswordByLink);
};
