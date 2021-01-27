const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  codes: {
    type: String
  },

  photos: [],
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('menu', MenuSchema);
