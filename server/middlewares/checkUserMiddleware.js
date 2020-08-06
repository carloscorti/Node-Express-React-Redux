const debug = require('debug')('server:checkUserMiddleware');

const checkUserMiddleware = (req, res, next) => {
  if (req.user) {
    debug('middleware pass');
    next();
  } else {
    debug('no user');
    return res.send('');
  }
};

module.exports = checkUserMiddleware;
