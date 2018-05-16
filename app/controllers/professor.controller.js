const Professor = require('../models/professor.model.js');

// Create and Save a new Professor
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Professor content can not be empty."
        });
    }

    // Create a Professor
    const professor = new Professor({
        lastName: req.body.lastName,
        middleName: req.body.middleName || "",
        firstName: req.body.firstName,
        courses: req.body.courses,
        evaluationOnsite: req.body.evaluationOnsite,
        evaluationOnline: req.body.evaluationOnline,
        rating: req.body.rating
    });

    // Save Professor in the database
    professor.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Professor."
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
        lastName: req.body.lastName,
        middleName: req.body.middleName || "",
        firstName: req.body.firstName,
        courses: req.body.courses,
        evaluationOnsite: req.body.evaluationOnsite,
        evaluationOnline: req.body.evaluationOnline,
        rating: req.body.rating
    }, { new: true })
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
// exports.delete = (req, res) => {
//     Professor.findByIdAndRemove(req.params.professorId)
//         .then(professor => {
//             if (!professor) {
//                 return res.status(404).send({
//                     message: "Professor not found with id " + req.params.professorId
//                 });
//             }
//             res.send({ message: "Professor deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Professor not found with id " + req.params.professorId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete professor with id " + req.params.professorId
//             });
//         });
// };