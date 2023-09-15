const bcrypt = require("bcrypt");
const express = require("express");
const Route = express.Router();
const jwt = require("jsonwebtoken");

const connection = require("../connection");

const saltRounds = 10;

Route.post("/", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    `SELECT * FROM users WHERE username = '${username}'`,
    (e, user) => {
      if (e) {
        console.log("ERROR ", e.sqlMessage);
        res.status(500).json({ error: "Internal Server Error" });
      }
      bcrypt.compare(password, user[0].password).then((result) => {
        if (result === true) {
          const token = jwt.sign(
            {
              user_id: user[0].id,
              role: user[0].role,
            },
            "secret",
            { expiresIn: "1h" }
          );
          console.log(token);
          return res.status(200).json({ login: true });
        }
        return res
          .status(500)
          .json({ login: false, message: "incorect password" });
      });
    }
  );
});

module.exports = Route;
