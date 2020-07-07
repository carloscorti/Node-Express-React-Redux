const express = require('express');
const passport = require('passport');

const googleOAuthRouter = () => {
  const router = express.Router();

  // router.use((req, res, next) => {
  //   console.info('middleware initRouter');
  //   next();
  // });

  router
    .route('/')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.route('/callback').get(
    passport.authenticate('google', {
      successRedirect: '/user',
      failureRedirect: '/login',
    })
  );

  return router;
};

module.exports = googleOAuthRouter;
