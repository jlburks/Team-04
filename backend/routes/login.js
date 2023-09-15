const express = require("express");
const Route = express.Router();

Route.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
});

module.exports = Route;
