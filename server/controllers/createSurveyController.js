const modelConnection = require('../services/modelConection.service');

const Survey = modelConnection.models.Survey;

const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const createSurveyController = async (req, res) => {
  if (req.body) {
    const { title, body, subject, recipients } = req.body;

    const recipientsList = recipients
      .split(',')
      .map((recipient) => ({ email: recipient.trim() }));

    const newSurvey = new Survey({
      title,
      body,
      subject,
      recipients: recipientsList,
      _user: req.user.id,
    });

    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

    await mailer.send();

    // const mongoNewSurvey = await newSurvey.save();
    // res.send(mongoNewSurvey);
  }
  res.send('no body');
};

module.exports = createSurveyController;
