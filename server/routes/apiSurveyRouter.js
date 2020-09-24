const express = require('express');

const checkUserMiddleware = require('../middlewares/checkUserMiddleware');
const checkCreditsMiddleware = require('../middlewares/checkCreditsMiddleware');
const createSurveyController = require('../controllers/createSurveyController');

const apiSurveyRouter = () => {
  const router = express.Router();

  router.use(checkUserMiddleware);

  router.route('/thanks').get((req, res) => res.send('Thanks for voting¡¡¡¡'));

  router.route('/').post(checkCreditsMiddleware, createSurveyController);

  return router;
};

module.exports = apiSurveyRouter;
