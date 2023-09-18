const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./connection");
const login = require("./routes/login");
const adminActions = require("./routes/admin/addUser");

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/admin", adminActions);

app.listen(PORT, () => console.log("running on port 3000"));
