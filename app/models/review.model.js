const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  professor: {
    type: Schema.ObjectId,
    ref: 'Professor',
    required: true
  },
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
    required: true
  },
  review_onsite: String,
  review_online: String,
  rating: {
    type: Number,
    required: [true, 'Rating is needed.']
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Review', ReviewSchema);