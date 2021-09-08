import express from "express";

const app: express.Application = express();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("hello");
  }
);

app.listen(5123, () => console.log("Server running"));