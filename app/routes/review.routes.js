const VerifyToken = require('./VerifyToken');

module.exports = (app) => {
    const reviews = require('../controllers/review.controller.js');
  
    app.post('/reviews', VerifyToken, reviews.create);
  
    app.get('/reviews', reviews.findAll);

    app.get('/reviews/:professorId', reviews.findByProfessorId);

    app.get('/reviews/:courseId', reviews.findByCourseId);
  }