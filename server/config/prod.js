module.exports = {
  mongoConnectionString: process.env.MONGO_URI,
  sessionKey: process.env.SESSION_KEY,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthCallbackUri:
    'https://emalybethere.herokuapp.com/auth/google/callback',
};
