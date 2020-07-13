const passport = require('passport');
const modelConnection = require('../services/modelConection.service');
const User = modelConnection.models.User;

require('./strategies/google.oauth.strategy')();

function passportConfig(app) {
  app.use(passport.initialize());

  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userMongoId, done) => {
    User.findById({ _id: userMongoId }, (err, user) => {
      if (err) {
        return done(err, { message: 'Ups there was an error' });
      }
      done(null, user);
    });
  });
}

module.exports = passportConfig;
