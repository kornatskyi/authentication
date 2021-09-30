import { MysqlError } from "mysql";
import sql from "./db";

class User {
  email: string;
  name: string;
  password: string;

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  static create = (newUser: User, result: Function) => {
    sql.query("INSERT INTO users SET ?", newUser, (err: Error, res: any) => {
      if (err) {
        console.log("Db error when creating new user: ", err);
        result(err, null);
        return;
      }

      console.log("Created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  static findById = (userId: number, result: Function) => {
    sql.query(
      `SELECT * FROM users WHERE id = ${userId}`,
      (err: Error, res: any) => {
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
      }
    );
  };

  // find user by email

  static findByEmail = (email: string, result: Function) => {
    sql.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err: Error, res: any) => {
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
      }
    );
  };

  static getAll = (result: Function) => {
    console.log("get all");

    sql.query("SELECT * FROM users", (err: Error, res: any) => {
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

  static updateById = (id: number, user: User, result: Function) => {
    sql.query(
      "UPDATE users SET email = ?, name = ? WHERE id = ?",
      [user.email, user.name, id],
      (err: Error, res: any) => {
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

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };

  static updatePasswordByEmail = (
    email: string,
    password: string,
    result: Function
  ) => {
    sql.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [password, email],
      (err: Error, res: any) => {
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
      }
    );
  };

  static remove = (id: number, result: Function) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err: Error, res: any) => {
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

  static removeByEmail = (email: string, result: Function) => {
    sql.query(
      "DELETE FROM users WHERE email = ?",
      email,
      (err: Error, res: any) => {
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
      }
    );
  };

  static removeAll = (result: Function) => {
    sql.query("DELETE FROM users", (err: Error, res: any) => {
      if (err) {
        console.log("Db error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };

  static getEmailConfirmationStatus = (email: string, result: any) => {
    sql.query(
      `SELECT confirmed FROM users WHERE email = '${email}'`,
      (err: Error, res: any) => {
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
      }
    );
  };

  static confirmEmail = (email: string, result: any) => {
    sql.query(
      `UPDATE users SET confirmed = 1 WHERE email = '${email}'`,
      (err: Error, res: any) => {
        if (err) {
          console.log("Db error: ", err);
          result(err, null);
          return;
        }
        console.log(res);
        result(null, res);
      }
    );
  };

  static updateByEmail = (email: string, user: User, result: any) => {
    sql.query(
      `UPDATE users SET email = '${user.email}', name = '${user.name}', password = '${user.password}' WHERE email = '${email}'`,
      (err: MysqlError, res: any) => {
        if (err) {
          console.log("Db error: ", err);
          result(err, null);
          return;
        }
        console.log(res);
        result(null, res);
      }
    );
  };
}

export default User;
