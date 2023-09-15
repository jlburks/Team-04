const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("succesful response");
});

app.listen(PORT, () => console.log("running on port 3000"));
