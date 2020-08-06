const debug = require('debug')('server:stripeController');
const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);

const stripeController = async (req, res) => {
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
};

module.exports = stripeController;
