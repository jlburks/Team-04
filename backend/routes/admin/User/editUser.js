const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../../connection");
const adminFunc = require("../../functions/verifyAdmin");

const saltRounds = 10;

Route.post("/editUser", adminFunc.verifyAdmin, (req, res) => {
  const { username, password, hourly_pay, role, currentUserId } = req.body;
  connection.query(
    `INSERT INTO users (username, password,hourly_pay, role) VALUES (?, ?, ?, ?) WHERE id = ?`,
    [username, hash, hourly_pay, role, currentUserId],
    (e) => {
      if (e) {
        console.log("Error adding user:", e);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ status: "user edited" });
    }
  );
});

Route.put("/editPassword/:userId", adminFunc.verifyAdmin, (req, res) => {
  const userId = req.params.userId;
  const { changedPassword } = req.body;

  bcrypt.genSalt(saltRounds, (e, salt) => {
    if (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    bcrypt.hash(changedPassword, salt, function (e, hash) {
      if (e) {
        console.log("Password hash operation unsuccessful");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      connection.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hash, userId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json({ update: "complete" });
        }
      );
    });
  });
});

module.exports = Route;
