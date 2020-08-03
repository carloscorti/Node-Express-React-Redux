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

  passport.deserializeUser(async (userMongoId, done) => {
    try {
      const user = await User.findById({ _id: userMongoId });
      done(null, user);
    } catch (err) {
      return done(err, { message: 'Ups there was an error' });
    }
  });
}

module.exports = passportConfig;
