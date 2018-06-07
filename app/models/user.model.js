const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is needed.']
  },
  email: {
    type: String,
    required: [true, 'Email is needed.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  roles: {
    type: [String],
    required: true,
    default: 'normal-user'
  },
}, {
    timestamps: true
  });

module.exports = mongoose.model('User', UserSchema);