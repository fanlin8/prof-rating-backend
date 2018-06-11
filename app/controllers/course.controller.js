const Course = require('../models/course.model.js');

// Create and Save a new Course
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Course content can not be empty."
    });
  }

  Course.findOne({ course_code: req.body.course_code }).then(course => {
    if (course) {
      return res.status(400).send({
        message: "Course already exists."
      });
    };

    // Create a Course
    const newCourse = new Course({
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      course_description: req.body.course_description || ""
    });

    // Save Course in the database
    newCourse.save()
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Course."
        });
      });
  });
};


// Retrieve and return all courses from the database.
exports.findAll = (req, res) => {
  Course.find()
    .then(courses => {
      res.send(courses);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses."
      });
    });
};

// Find a single course with a courseId
exports.findOne = (req, res) => {
  Course.findById(req.params.courseId)
    .then(course => {
      if (!course) {
        return res.status(404).send({
          message: "course not found with id " + req.params.courseId
        });
      }
      res.send(course);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId
        });
      }
      return res.status(500).send({
        message: "Error retrieving course with id " + req.params.courseId
      });
    });
};

// Update a course identified by the courseId in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Course content can not be empty"
    });
  }

  // Find course and update it with the request body
  Course.findByIdAndUpdate(req.params.courseId, {
    course_code: req.body.course_code,
    course_name: req.body.course_name,
    course_description: req.body.course_description || ""
  }, { new: false })
    .then(course => {
      if (!course) {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId
        });
      }
      res.send(course);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId
        });
      }
      return res.status(500).send({
        message: "Error updating course with id " + req.params.courseId
      });
    });
};

// Delete a course with the specified courseId in the request
exports.delete = (req, res) => {
  Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
      if (!course) {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId
        });
      }
      res.send({ message: "Course deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Course not found with id " + req.params.courseId
        });
      }
      return res.status(500).send({
        message: "Could not delete course with id " + req.params.courseId
      });
    });
};