const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../../connection");
const adminFunc = require("../../functions/verifyAdmin");

const saltRounds = 10;

Route.put("/editUser/:userId", adminFunc.verifyAdmin, (req, res) => {
  const userId = req.params.userId;
  console.log("BODY +====", req.body);
  const { username, hourly_pay, role } = req.body;
  console.log("USERNAME =>>>", username);
  connection.query(
    `UPDATE users SET username = ?, hourly_pay = ?, role = ? WHERE id = ?`,
    [username, hourly_pay, role, userId],
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

Route.put("/editTime/:userId/:start/:projectId", (req, res) => {
  const { userId, start, projectId } = req.params;
  const statingTime = start.slice(0, -1).replace("T", " ");
  // console.log(userId, statingTime, projectId);
  console.log(
    "SQL STATEMENT =>",
    `SELECT * FROM workHours WHERE user_id = ${userId} AND start_time LIKE ${statingTime} AND project_id = ${projectId}`
  );
  connection.query(
    `SELECT * FROM workHours WHERE user_id = ? AND start_time LIKE ? AND project_id = ?`,
    [userId, statingTime, projectId],
    (err, result) => {
      if (err) {
        res.json({ staus: unsuccesful });
      }
      console.log(result);
      res.json({ status: "success" });
    }
  );
});

module.exports = Route;
