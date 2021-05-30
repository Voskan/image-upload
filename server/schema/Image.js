const mongoose = require('mongoose');
const db = require('../lib/mongoConnect');

const imageSchema = new db.Schema({
  key: String,
  logs: [
    {
      logType: {
        type: String,
        enum: ["crop", "resize", "blur", "upload"],
        default: "upload"
      },
      message: String,
      date: {
        type: Date,
        default: Date.now()
      }
    },
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Image', imageSchema);
