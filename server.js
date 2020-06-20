const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;
// const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

mongoose.connect(process.env.MONGODB_URI || "mongodb://Online-Offline-Budget-Tracker:0FFLINE8udget@ds239638.mlab.com:39638/heroku_6fd1h200", {
  useNewUrlParser: true,
  useFindAndModify: false
});
// // if deployed, use the deployed database. Otherwise, use the local mongoHeadlines


// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});