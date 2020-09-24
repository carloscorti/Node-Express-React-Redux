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

    try {
      await mailer.send();

      await newSurvey.save();

      req.user.credits -= 1;

      const user = await req.user.save();

      return res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  }
  return res.send('no body');
};

module.exports = createSurveyController;
