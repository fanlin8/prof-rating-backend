const Professor = require('../models/professor.model.js');
const Course = require('../models/course.model.js');
const User = require('../models/user.model.js');
const Review = require('../models/review.model.js');

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Review content can not be empty."
    });
  }

  Promise.all([
    User.findOne({ _id: req.userId }),
    Professor.findOne({ _id: req.body.professor }),
    Course.findOne({ _id: req.body.course })
  ]).then(items => {
    const hasNull = items.some(item => item == null);
    if (hasNull) {
      return res.status(400).send({
        message: "Some required contents are missing."
      });
    }

    const newReview = new Review({
      creator: req.userId,
      professor: req.body.professor,
      course: req.body.course,
      review_onsite: req.body.review_onsite,
      review_online: req.body.review_online,
      rating: req.body.rating
    });

    newReview.save()
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Review."
        });
      });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Review."
    });
  }

  );
};

exports.findAll = (req, res) => {
  Review.find()
    .then(reviews => {
      res.send(reviews);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reviews."
      });
    });
};

exports.findByProfessorId = (req, res) => {
  Review.find({professor: req.params.professorId})
    .then(reviews => {
      if (!reviews) {
        return res.status(404).send({
          message: "Reviews not found with professor id " + req.params.professorId
        });
      }
      res.send(reviews);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Reviews not found with professor id " + req.params.professorId
        });
      }
      return res.status(500).send({
        message: "Reviews not found with professor id " + req.params.professorId
      });
    });
};

exports.findByCourseId = (req, res) => {
  Review.find({course: req.params.courseId})
    .then(reviews => {
      if (!reviews) {
        return res.status(404).send({
          message: "Reviews not found with course id " + req.params.courseId
        });
      }
      res.send(reviews);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Reviews not found with course id " + req.params.courseId
        });
      }
      return res.status(500).send({
        message: "Reviews not found with course id " + req.params.courseId
      });
    });
};