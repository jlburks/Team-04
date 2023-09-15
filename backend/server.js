const express = require("express");
const app = express();

const login = require("./routes/login");

const PORT = 3000;

app.use(express.json());

app.use("/login", login);

app.listen(PORT, () => console.log("running on port 3000"));
