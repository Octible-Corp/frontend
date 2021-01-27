const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuV2Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  restaurant: {
    type: String
  },
  website: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  logo_photo: {
    type: String
  },
  featured_photo: {
    type: String
  },
  pdf: {
    type: String
  },
  sections: [],
  items: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('menuv2', MenuV2Schema);
