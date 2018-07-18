const db = require('../models/index');
const export_articles = module.exports = {};

//get all articles
export_articles.allArticles = function(req, res) {

  db.Article.find({})
  .then(dbArticle => res.json(dbArticle))
  .catch(err => res.json(err));
}

//get a specific article by id and populate it with its comment
export_articles.articleByIdWithComment = function(req, res) {

  db.Article.findOne({_id: req.params.id})
  .populate('comment')
  .then(dbArticle => res.json(dbArticle))
  .catch(err => res.json(err));
}

//