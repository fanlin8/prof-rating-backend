const VerifyToken = require('./VerifyToken');

module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');

  app.post('/login', auth.login);

  app.get('/logout', auth.logout);

  // Register a new user
  app.post('/register', auth.register);

  // Get info for current user
  app.get('/me', VerifyToken, auth.getMe);
}