const modelConnection = require('../services/modelConection.service');

const Survey = modelConnection.models.Survey;

const createSurveyController = async (req, res) => {
  if (req.body) {
    const { title, body, subject, recipientString } = req.body;

    const recipients = recipientString
      .split(',')
      .map((recipient) => ({ email: recipient.trim() }));

    const newSurvey = new Survey({
      title,
      body,
      subject,
      recipients,
      _user: req.user.id,
    });

    const mongoNewSurvey = await newSurvey.save();
    res.send(mongoNewSurvey);
  }
  res.send('no body');
};

module.exports = createSurveyController;
