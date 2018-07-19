var articles_controller = require('../controllers/articles');
var router = require('express').Router();

// landing page
router.get('/', (req, res, next) => res.render('index', { title: 'BBC article scrape' }));
// scrape articles from BBC World News web site
router.get('/scrape', (req, res) => articles_controller.scrapeArticles(req, res));
// get all articles
router.get('/articles', (req, res) => articles_controller.allArticles(req, res));
// get an article by id
router.get('/articles/:id', (req, res) => articles_controller.articleByIdWithComment(req, res));

module.exports = router;
