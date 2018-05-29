require('dotenv').config();
const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;
console.log(process.env.PORT);

const options = {
  reconnectTries: 10,
  poolSize: 10
};

// Connecting to the database
mongoose.connect(dbURI, options)
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
  });
