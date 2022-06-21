const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpError = require("./ErrorModel/errorModel");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/posts", postRoutes);
app.use("/api/accounts", userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), '/client/build')));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

//error middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const Database_URL = process.env.DB_URL;
const port = process.env.PORT || 5000;

//connect to db
mongoose
  .connect(Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port))
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
