const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpError = require("./ErrorModel/errorModel");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/posts", postRoutes);
app.use("/api/accounts", userRoutes);


app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    return next(error);
  });

//error middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const Database_URL = process.env.DB_URL;
const port = process.env.PORT;

//connect to db
mongoose
  .connect(Database_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(port || process.env.PORT))
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });