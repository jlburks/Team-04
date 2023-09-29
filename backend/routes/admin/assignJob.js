const express = require("express");
const Route = express.Router();
const bcrypt = require("bcrypt");

const connection = require("../../connection");
const adminFunc = require("../functions/verifyAdmin");

const saltRounds = 10;

// REMEMBER to insert middleware function adminFunc.verifyAdmin
Route.post("/assignJob", (req, res) => {
  const {} = req.body;
});

module.exports = Route;
