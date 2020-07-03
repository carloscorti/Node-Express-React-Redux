const express = require('express');

const initRouter = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    console.info('middleware initRouter');
    next();
  });

  router.route('/').get((req, res) => res.send('Hola initRouter'));

  return router;
};

module.exports = initRouter;
