"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const users = __importStar(require("../controllers/users.controller"));
exports.default = (app) => {
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
