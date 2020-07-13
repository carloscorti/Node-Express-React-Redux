const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  name: { type: String, default: '' },
  providerId: { type: String, default: '' },
  email: { type: String, default: '' },
  provider: { type: String, default: '' },
  creationDate: { type: Date, default: Date.now },
});

module.exports = { name: 'User', schema: userModel };
