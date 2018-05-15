const mongoose = require('mongoose');

const ProfessorSchema = mongoose.Schema({
    lastname: String,
    firstname: String,
    classes:  [{
        type: String
    }],
    evaluation: String,
    rating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', ProfessorSchema);