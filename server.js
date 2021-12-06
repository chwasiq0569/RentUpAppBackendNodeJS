const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./route/user");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("CONNECTION ESTABLISED"))
  .catch((err) => console.log("CONNECTION FAILED: ", err));

app.use("/api/v1/user", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
