require('dotenv').config({ path: __dirname + '/variables.env' });
const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;

const options = {
  reconnectTries: 20,
  poolSize: 10
};

// Connecting to the database
mongoose.connect(dbURI, options)
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
  });
mongoose.Promise = global.Promise;

function close() {
  mongoose.connection.close();
}

module.exports = {
  close
};
