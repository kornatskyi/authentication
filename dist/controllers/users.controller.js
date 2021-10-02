"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = exports.deleteAll = exports.deleteById = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create and Save a new User
const create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    const hash = bcryptjs_1.default.hashSync(req.body.password, 14);
    req.body.password = hash;
    // Create a User
    const user = new user_model_1.default(req.body.email, req.body.name, req.body.password);
    // Save User in the database
    user_model_1.default.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User.",
            });
        else {
            res.status(200);
            res.send("Registered");
        }
    });
};
exports.create = create;
// Retrieve all Users from the database.
const findAll = (req, res) => {
    user_model_1.default.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users.",
            });
        else
            res.send(data);
    });
};
exports.findAll = findAll;
// Find a single User with a customerId
const findOne = (req, res) => {
    user_model_1.default.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.customerId}.`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.customerId,
                });
            }
        }
        else
            res.send(data);
    });
};
exports.findOne = findOne;
// Update a User identified by the customerId in the request
const update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    user_model_1.default.updateById(req.params.customerId, new user_model_1.default(req.body.email, req.body.name, req.body.password), (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.customerId}.`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error updating User with id " + req.params.customerId,
                });
            }
        }
        else
            res.send(data);
    });
};
exports.update = update;
// Delete a User with the specified customerId in the request
const deleteById = (req, res) => {
    user_model_1.default.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.customerId}.`,
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.customerId,
                });
            }
        }
        else
            res.send({ message: `User was deleted successfully!` });
    });
};
exports.deleteById = deleteById;
// Delete all Users from the database.
const deleteAll = (req, res) => {
    user_model_1.default.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users.",
            });
        else
            res.send({ message: `All Users were deleted successfully!` });
    });
};
exports.deleteAll = deleteAll;
const confirmEmail = (req, res) => { };
exports.confirmEmail = confirmEmail;
