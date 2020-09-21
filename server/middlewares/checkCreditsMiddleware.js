const debug = require('debug')('server:checkCreditsMiddleware');

const checkCreditsMiddleware = (req, res, next) => {
  if (req.user.credits > 1) {
    debug('check credit middleware pass');
    next();
  } else {
    debug('no credits');
    return res.send('');
  }
};

module.exports = checkCreditsMiddleware;
