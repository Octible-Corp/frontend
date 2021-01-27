const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: 'null',
    required: true
  },
  url: {
    type: String,
    default: 'null',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  step_tracker: {
    type: String,
    default: '1',
    required: true
  }
});

module.exports = mongoose.model('user', UserSchema);
