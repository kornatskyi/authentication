import User from '../models/user.model'


// Create and Save a new User
exports.create = (req: any, res: any) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User(req.body.email, req.body.name, req.body.password);

  // Save User in the database
  User.create(user, (err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req: any, res: any) => {
  User.getAll((err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Find a single User with a customerId
exports.findOne = (req: any, res: any) => {
  User.findById(req.params.customerId, (err: Error, data: any) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the customerId in the request
exports.update = (req: any, res: any) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(
    req.params.customerId,
    new User(req.body.email, req.body.name, req.body.password),
    (err: Error, data: any) => {
      if (err) {
        if (err.message === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.customerId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.customerId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified customerId in the request
exports.delete = (req: any, res: any) => {
  User.remove(req.params.customerId, (err: Error, data: any) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.customerId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};



// Delete all Users from the database.
exports.deleteAll = (req: any, res: any) => {
  User.removeAll((err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
