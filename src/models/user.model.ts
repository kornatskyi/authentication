const sql = require("./db");

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
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  static findById = (userId: number, result: Function) => {
    sql.query(
      `SELECT * FROM users WHERE id = ${userId}`,
      (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
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
          console.log("error: ", err);
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

  static getAll = (result: Function) => {
    sql.query("SELECT * FROM users", (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
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
          console.log("error: ", err);
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

  static remove = (id: number, result: Function) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
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

  static removeAll = (result: Function) => {
    sql.query("DELETE FROM users", (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
}

export default User;