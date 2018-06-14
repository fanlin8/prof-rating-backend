const Professor = require('../models/professor.model.js');
const Course = require('../models/course.model.js');

// Create and Save a new Professor
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Professor content can not be empty."
    });
  }

  // Get Courses
  Course.find({
    'course_code': { $in: req.body.course }
  }, '_id').then(courses => {
    // if (!courses) {
    //   return res.status(404).send({
    //     message: "Course not found."
    //   });
    // };

    Professor.findOne({ last_name: req.body.last_name, first_name: req.body.first_name, middle_name: req.body.middle_name || "" }).then(professor => {
      if (professor) {
        return res.status(400).send({
          message: "Professor already exists."
        });
      };

      // Create a Professor
      const newProfessor = new Professor({
        last_name: req.body.last_name,
        middle_name: req.body.middle_name || "",
        first_name: req.body.first_name,
        course: [...courses]
      });

      // Save Professor in the database
      newProfessor.save()
        .then(data => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Professor."
          });
        });
    });
  });
};

// Retrieve and return all professors from the database.
exports.findAll = (req, res) => {
  Professor.find()
    .then(professors => {
      res.send(professors);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving professors."
      });
    });
};

// Find a single professor with a professorId
exports.findOne = (req, res) => {
  Professor.findById(req.params.professorId)
    .then(professor => {
      if (!professor) {
        return res.status(404).send({
          message: "professor not found with id " + req.params.professorId
        });
      }
      res.send(professor);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Professor not found with id " + req.params.professorId
        });
      }
      return res.status(500).send({
        message: "Error retrieving professor with id " + req.params.professorId
      });
    });
};

// Update a professor identified by the professorId in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Professor content can not be empty"
    });
  }

  // Find professor and update it with the request body
  Professor.findByIdAndUpdate(req.params.professorId, {
    last_name: req.body.last_name,
    middle_name: req.body.middle_name || "",
    first_name: req.body.first_name
  }, { new: false })
    .then(professor => {
      if (!professor) {
        return res.status(404).send({
          message: "Professor not found with id " + req.params.professorId
        });
      }
      res.send(professor);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Professor not found with id " + req.params.professorId
        });
      }
      return res.status(500).send({
        message: "Error updating professor with id " + req.params.professorId
      });
    });
};

// Delete a professor with the specified professorId in the request
exports.delete = (req, res) => {
  Professor.findByIdAndRemove(req.params.professorId)
    .then(professor => {
      if (!professor) {
        return res.status(404).send({
          message: "Professor not found with id " + req.params.professorId
        });
      }
      res.send({ message: "Professor deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Professor not found with id " + req.params.professorId
        });
      }
      return res.status(500).send({
        message: "Could not delete professor with id " + req.params.professorId
      });
    });
};