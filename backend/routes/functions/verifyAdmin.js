require("dotenv").config();

const secret = process.env.jwtSecret;

const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  try {
    const stringToken = req.headers.authorization;
    const token = stringToken.substring(8, stringToken.length - 1);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ error: "token verification unsuccesul" });
      }
      if (decoded.role === "admin") {
        next();
      } else {
        return res.json({ error: "access denied" });
      }
    });
  } catch (e) {
    console.log(e);
    res.json({ error: "Issue verifying user" });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const stringToken = req.headers.authorization;
    const token = stringToken.substring(8, stringToken.length - 1);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ error: "token verification unsuccesul" });
      }
      console.log(decoded);
      if (decoded.role === "admin" || decoded.role === "user") {
        next();
      } else {
        return res.json({ error: "access denied" });
      }
    });
  } catch (e) {
    console.log(e);
    res.json({ error: "Issue verifying user" });
  }
};

module.exports = { verifyAdmin, verifyUser };