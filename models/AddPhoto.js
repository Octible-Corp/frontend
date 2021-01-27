const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddPhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  staging: {
    type: Boolean,
    default: true
  },
  name: {
    type: String
  },
  menuId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('addphoto', AddPhotoSchema);
