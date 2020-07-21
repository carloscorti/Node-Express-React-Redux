const express = require('express');
const passport = require('passport');
const debug = require('debug')('server:googleOAuthRouter');

const googleOAuthRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    debug('middleware OAuthRouter');
    if (req.user) {
      debug('user logged redirect');
      res.redirect('/api/current_user');
    } else {
      debug('no user logued');
      next();
    }
  });

  router
    .route('/')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.route('/callback').get(
    passport.authenticate('google', {
      successRedirect: '/api/current_user',
      failureRedirect: '/auth/google',
    })
  );

  return router;
};

module.exports = googleOAuthRouter;
