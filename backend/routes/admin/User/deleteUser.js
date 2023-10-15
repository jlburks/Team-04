const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../../connection");
const adminFunc = require("../../functions/verifyAdmin");

const saltRounds = 10;

Route.delete("/deleteUser/:userId", (req, res) => {
  console.log("PARAMS =>", req.params.userId);
  connection.query(
    `DELETE FROM users WHERE id = ?`,
    [req.params.userId],
    (e, data) => {
      if (e) {
        return console.log(e);
      } else {
        return res.json({ delete: "successful" });
      }
    }
  );
  return;
});

module.exports = Route;
