const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientID, googleClientSecret } = require('../keys');

function oAuthStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback',
      },

      (accessToken, refreshToken, profile, done) => {
        console.log(`Acces token: ${accessToken}`);
        console.log(`Refresh Token: ${refreshToken}`);
        console.log(`Profile: ${profile}`);
        done(null, profile);
      }
    )
  );
}

module.exports = oAuthStrategy;
