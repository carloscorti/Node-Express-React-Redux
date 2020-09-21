const sendGrid = require('sendGrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // enebles api with our personal key
    this.sgApi = sendGrid(keys.sendGridKey);

    this.from_email = new helper.Email('portfoliocarlosnoreply@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // built in helper.Mail, adds body to the mail
    this.addContent(this.body);

    // implemented here, enables click tracking
    this.addClickTracking();

    // implemented here, adds recipients to the email
    this.addRecipients();
  }

  formatAddresses = (recipients) => {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  };

  //enables click tracking
  addClickTracking = () => {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  };

  // add recipietns to sendGrid mail
  addRecipients = () => {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  };

  send = async () => {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(), // defined by Mail base class
    });

    const response = await this.sgApi.API(request); // .API() from sendGrid api

    return response;
  };
}

module.exports = Mailer;
