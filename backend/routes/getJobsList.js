require("dotenv").config();

const secret = process.env.jwtSecret;

const express = require("express");
const Route = express.Router();
const jwt = require("jsonwebtoken");

const connection = require("../connection");

Route.get("/", (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "").trim();
  jwt.verify(token, secret, (e, data) => {
    if (e) {
      console.log("probelm verifying", e);
    }
    console.log(data);
    connection.query(
      `SELECT DISTINCT workHours.project_id,jobs.name,jobs.description
    FROM workHours
    INNER JOIN jobs ON workHours.project_id = jobs.id 
    WHERE user_id = ? AND jobs.active = 1 `,
      [data.user_id],
      (e, jobs) => {
        if (e) {
          console.log("querry problem");
          return res.json({ error: "error with query" });
        }
        console.log("Jobssss  ", jobs);
        res.json({ jobs });
      }
    );
  });
});

module.exports = Route;
