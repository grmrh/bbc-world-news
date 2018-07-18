const router = require('express').Router();
const articles_api_controller = require('../controllers/articles_api');

/* GET articles listing. */
router.get('/', function(req, res, next) {
  articles_api_controller.allArticles(req, res, next);
});

module.exports = router;
