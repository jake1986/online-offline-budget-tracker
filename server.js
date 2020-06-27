const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URL || `mongodb://Budge-Track:${encodeURIComponent('8udgetTR@CKER')}@ds253418.mlab.com:53418/heroku_19x8r55r`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// mongoose.connect(process.env.MONGODB_URI || `mongodb://Budge-Track:${encodeURIComponent('8udgetTR@CKER')}@ds253418.mlab.com:53418/heroku_19x8r55r`, {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });


// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});