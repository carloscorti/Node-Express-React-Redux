const mongoose = require('mongoose');
const recipientModel = require('./recipientModel').schema;

const { Schema } = mongoose;

const surveyModel = new Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  subject: { type: String, default: '' },
  recipients: { type: [recipientModel], default: [] },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: { type: Date, default: Date.now },
  lastResponded: { type: Date },
});

module.exports = { name: 'Survey', schema: surveyModel };
