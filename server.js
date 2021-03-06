const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/database.config.js');
const port = process.env.PORT || 9090;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to HU Rating application. This is a project based Angular framework." });
});

// temporarily disable server side caching
app.disable('etag');

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// require authentication routes
require('./app/routes/auth.routes.js')(app);
// require Courses routes
require('./app/routes/course.routes.js')(app);
// require Professors routes
require('./app/routes/professor.routes.js')(app);
// require Reviews routes
require('./app/routes/review.routes.js')(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
