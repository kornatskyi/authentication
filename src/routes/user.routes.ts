import * as users from "../controllers/users.controller";
export default (app: any) => {
  // Create a new User
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single User with customerId
  app.get("/users/:customerId", users.findOne);

  // Update a User with customerId
  app.put("/users/:customerId", users.update);

  // Delete a User with customerId
  app.delete("/users/:customerId", users.deleteById);

  // Create a new User
  app.delete("/users", users.deleteAll);
};
