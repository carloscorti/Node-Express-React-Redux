const express = require('express');
const debug = require('debug')('server:apiRouter');

const stripeController = require('../controllers/stripeController');
const checkUserMiddleware = require('../middlewares/checkUserMiddleware');

const apiRouter = () => {
  const router = express.Router();

  router.use(checkUserMiddleware);

  router.get('/current_user', (req, res) => {
    res.send(req.user);
    // debug(req.user);
    // debug(req.session);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    // debug('logged out');
    res.redirect('/');
  });

  router.post('/stripe', stripeController);

  return router;
};

module.exports = apiRouter;
