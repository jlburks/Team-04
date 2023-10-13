const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../../connection");
const adminFunc = require("../../functions/verifyAdmin");

const saltRounds = 10;

Route.get("/allUsers", adminFunc.verifyAdmin, (req, res) => {
  connection.query("SELECT * FROM users", (e, data) => {
    if (e) {
      console.log(e);
    }
    console.log(data);
    return res.json({ userList: data });
  });
});

module.exports = Route;
