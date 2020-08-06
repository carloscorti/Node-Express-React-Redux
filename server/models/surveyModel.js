const mongoose = require('mongoose');
const recipientModel = require('./recipientModel').schema;

const { Schema } = mongoose;

const surveyModel = new Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  subject: { type: String, default: '' },
  ricipients: { type: [recipientModel], default: [] },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  creationDate: { type: Date, default: Date.now },
});

module.exports = { name: 'Survey', schema: surveyModel };
