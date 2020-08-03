const express = require('express');
const debug = require('debug')('server:apiRouter');
const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);

const apiRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    if (req.user) {
      debug('middleware apiRouter');
      next();
    } else {
      debug('no user');
      return res.send('');
    }
  });

  router.get('/current_user', (req, res) => {
    res.send(req.user);
    debug(req.user);
    debug(req.session);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    debug('logged out');
    res.redirect('/');
  });

  router.post('/stripe', async (req, res) => {
    debug(req.body);
    try {
      const charge = await stripe.charges.create({
        amount: 500, //us dolar cens
        currency: 'usd',
        source: req.body.id,
        description: '$5 for 5 emails credits',
      });
    } catch (stripeErr) {
      debug(stripeErr);
      return res.status(401).send({ error: 'charge error' });
    }

    try {
      req.user.credits += 5;
      const userAddCredit = await req.user.save();
      res.send(userAddCredit);
    } catch (mongoErr) {
      debug(mongoErr);
      return res.status(404).send({ error: 'mongo error' });
    }
  });

  return router;
};

module.exports = apiRouter;
