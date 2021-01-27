const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  url: {
    type: String,
    default: null
  },
  qrId: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('code', CodeSchema);
