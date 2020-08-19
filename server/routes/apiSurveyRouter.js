const express = require('express');

const checkUserMiddleware = require('../middlewares/checkUserMiddleware');
const checkCreditsMiddleware = require('../middlewares/checkCreditsMiddleware');
const createSurveyController = require('../controllers/createSurveyController');

const apiSurveyRouter = () => {
  const router = express.Router();

  router.use(checkUserMiddleware);

  router.route('/').get((req, res) => res.send('Hola apiSurveyRouter'));

  router.route('/').post(checkCreditsMiddleware, createSurveyController);

  return router;
};

module.exports = apiSurveyRouter;
