const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../connection");

const saltRounds = 10;

Route.post("/addUser", (req, res) => {
  const { username, password, role } = req.body;
  bcrypt.genSalt(saltRounds, (e, salt) => {
    if (e) return console.log(e);
    bcrypt.hash(password, salt, function (e, hash) {
      if (e) return console.log("password hash operation unsuccesful");
      connection.query(
        `INSERT INTO users (username,password,role) VALUES ('${username}','${hash}','${role}') `
      );
      res.status(201).json({ status: "new user created" });
    });
  });
});

module.exports = Route;
