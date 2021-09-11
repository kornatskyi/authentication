const express = require("express");
const bodyParser = require("body-parser");

const app  = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});


require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
