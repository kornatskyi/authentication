CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  confirmed SMALLINT NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
var conn = mysql.createConnection(
  { host: "kornatskyi-authentication-db.mysql.database.azure.com",
  user: "bohdan@kornatskyi-authentication-db",
  password: { your_password },
  database: { your_database },
  port: 3306,
  ssl: { ca :fs.readFileSync({ ca - cert filename }) } }
);