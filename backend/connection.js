const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "team04.cgzeopnlnruo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "CIS4375!",
  database: "YourDatabaseName",
});

connection.connect((e) => {
  if (e) return console.log("connection error");
  console.log("connection established!");
});

connection.on("error", (err) => {
  console.error("MySQL connection error:", err.message);
});

module.exports = connection;
