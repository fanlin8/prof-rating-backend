const VerifyToken = require('./VerifyToken');

module.exports = (app) => {
  const courses = require('../controllers/course.controller.js');

  app.post('/courses', VerifyToken, courses.create);

  app.get('/courses', courses.findAll);

  app.get('/courses/:courseId', courses.findOne);

  app.put('/courses/:courseId', VerifyToken, courses.update);

  app.delete('/courses/:courseId', VerifyToken, courses.delete);
}