const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  course_code: {
    type: String,
    required: [true, 'Course Code is needed.']
  },
  course_name: {
    type: String
  },
  course_description: {
    type: String
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Course', CourseSchema);