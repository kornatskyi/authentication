import app from "./app";

console.log(process.env.ORIGIN_URL);
console.log(process.env.DB_HOST);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
