var articles_controller = require('../controllers/articles');
var router = require('express').Router();

// landing page
//router.get('/', (req, res, next) => res.render('index', { title: 'BBC article scrape' }));
router.get('/', (req, res) => articles_controller.landingPage(req, res));
//to /articles page
//router.get('/articles', (req, res, next) => res.render('articles', { title: 'BBC article scrape', articles: articles }));

// scrape articles from BBC World News web site
router.get('/scrape', (req, res) => articles_controller.scrapeArticles(req, res));

// get all articles in json
router.get('/api/articles', (req, res) => articles_controller.allArticles(req, res));
//router.get('/', (req, res) => articles_controller.allArticles(req, res));
// get an article by id in json
router.get('/api/articles/:id', (req, res) => articles_controller.articleByIdWithComment(req, res));

module.exports = router;
