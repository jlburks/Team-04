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
    connection.query(`SELECT * FROM jobs WHERE `);
  });
});

module.exports = Route;
