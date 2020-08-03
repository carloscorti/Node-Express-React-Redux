const passport = require('passport');
const debug = require('debug')('server:google.oauth.strategy');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  googleClientID,
  googleClientSecret,
  googleOauthCallbackUri,
} = require('../keys');
const modelConnection = require('../../services/modelConection.service');
const User = modelConnection.models.User;

function oAuthStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: googleOauthCallbackUri,
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ providerId: profile.id });
          if (!user) {
            const newUser = new User({
              providerId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: profile.provider,
              google: profile._json,
            });

            try {
              const mongoNewUser = await newUser.save();
              return done(null, mongoNewUser);
            } catch (saveError) {
              debug(err);
              return done(err, { message: 'Ups try loggin again' });
            }
          }

          return done(null, user);
        } catch (err) {
          debug(err);
          return done(err, { message: 'Ups there was an error' });
        }
      }
    )
  );
}

module.exports = oAuthStrategy;
