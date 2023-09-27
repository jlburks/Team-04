const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./connection");
const login = require("./routes/login");
const jobs = require("./routes/getJobsList");
const checkInOut = require("./routes/checkInOut");
const addUser = require("./routes/admin/addUser");

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/admin", addUser);
app.use("/jobs", jobs);
app.use("/", checkInOut);

app.listen(PORT, () => console.log("running on port 3000"));
