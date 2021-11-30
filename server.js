const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("CONNECTION ESTABLISED"))
  .catch((err) => console.log("CONNECTION FAILED: ", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
