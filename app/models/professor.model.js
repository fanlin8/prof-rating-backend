const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    lastName: String,
    middleName: String,
    firstName: String,
    courses:  [{
        type: String
    }],
    evaluationOnsite: String,
    evaluationOnline: String,
    rating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', ProfessorSchema);