const express = require('express');

const checkUserMiddleware = require('../middlewares/checkUserMiddleware');
const createSurveyController = require('../controllers/createSurveyController');

const apiSurveyRouter = () => {
  const router = express.Router();

  router.use(checkUserMiddleware);

  router.route('/').get((req, res) => res.send('Hola apiSurveyRouter'));

  router.route('/').post(createSurveyController);

  return router;
};

module.exports = apiSurveyRouter;
