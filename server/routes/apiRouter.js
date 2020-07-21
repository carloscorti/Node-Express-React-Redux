const express = require('express');
const debug = require('debug')('server:apiRouter');

const apiRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    if (req.user) {
      debug('middleware apiRouter');
      next();
    } else {
      debug('no user, redirect');
      res.redirect('/');
    }
  });

  router.get('/current_user', (req, res) => {
    res.send(req.user);
    debug(req.user);
    debug(req.session);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.send({ bye: 'bye' });
    debug('logged out');
  });

  return router;
};

module.exports = apiRouter;
