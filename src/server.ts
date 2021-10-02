import app from "./app";

console.log("Some logs to consoooole!!!!");

setInterval(() => {
  console.log("Some log on:");

  console.log(new Date());
}, 1000);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
