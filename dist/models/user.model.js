"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
class User {
    constructor(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
User.create = (newUser, result) => {
    db_1.default.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("Db error when creating new user: ", err);
            result(err, null);
            return;
        }
        console.log("Created user: ", Object.assign({ id: res.insertId }, newUser));
        result(null, Object.assign({ id: res.insertId }, newUser));
    });
};
User.findById = (userId, result) => {
    db_1.default.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        console.log(res);
        if (err) {
            console.log("Db error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};
// find user by email
User.findByEmail = (email, result) => {
    db_1.default.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};
User.getAll = (result) => {
    db_1.default.query("SELECT * FROM users", (err, res) => {
        console.log("debug");
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.updateById = (id, user, result) => {
    db_1.default.query("UPDATE users SET email = ?, name = ? WHERE id = ?", [user.email, user.name, id], (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user: ", Object.assign({ id: id }, user));
        result(null, Object.assign({ id: id }, user));
    });
};
User.updatePasswordByEmail = (email, password, result) => {
    db_1.default.query("UPDATE users SET password = ? WHERE email = ?", [password, email], (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found user with the email
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("updated user password: ", { email: email });
        result(null, { email: email });
    });
};
User.remove = (id, result) => {
    db_1.default.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};
User.removeByEmail = (email, result) => {
    db_1.default.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with email: ", email);
        result(null, res);
    });
};
User.removeAll = (result) => {
    db_1.default.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};
User.getEmailConfirmationStatus = (email, result) => {
    db_1.default.query(`SELECT confirmed FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`Email ${email} confirmation status is: `, res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};
User.confirmEmail = (email, result) => {
    db_1.default.query(`UPDATE users SET confirmed = 1 WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};
User.updateByEmail = (email, user, result) => {
    db_1.default.query(`UPDATE users SET email = '${user.email}', name = '${user.name}', password = '${user.password}' WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("Db error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};
exports.default = User;
