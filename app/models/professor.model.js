const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfessorSchema = mongoose.Schema({
  last_name: {
    type: String,
    required: [true, 'Last Name is needed.']
  },
  middle_name: {
    type: String
  },
  first_name: {
    type: String,
    required: [true, 'First Name is needed.']
  },
  course: [{
    type: Schema.ObjectId,
    ref: 'Course'
  }],
}, {
    timestamps: true
  });

ProfessorSchema
  .virtual('format_name')
  .get(_ => {
    return this.last_name + ', ' + this.first_name + this.middle_name ? (', ' + this.middle_name) : '';
  });

module.exports = mongoose.model('Professor', ProfessorSchema);