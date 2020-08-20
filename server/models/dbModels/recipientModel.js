const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipientModel = new Schema({
  email: { type: String, required: true },
  responded: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now },
});

module.exports = { name: '', schema: recipientModel };
