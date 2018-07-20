const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const export_articles = module.exports = {};

// initial page
export_articles.landingPage = function(req, res) {

  let hbsObj = {article: [{}]};
  res.render('index', hbsObj);

  // db.Article.find({})
  //   .then(articles => {
  //     //console.log('controllers allArticles \n', articles);
  //     let hbsObj = {articles: articles};
  //     console.log('controllers landing page \n', hbsObj);
  //     res.render('index', hbsObj)})
  //   .catch(err => res.json(err));
}

//get all articles
export_articles.allArticles = function (req, res) {

  db.Article.find({})
    .then(dbArticle => {
      //console.log('controllers allArticles \n', articles);
      let hbsObj = {articles: dbArticle};
      console.log('controllers allArticles \n', hbsObj);
      res.json(hbsObj);
      // res.render('index', hbsObj);
    })
    .catch(err => res.json(err));
}

//get a specific article by id and populate it with its comment
export_articles.articleByIdWithComment = function (req, res) {

  db.Article.findOne({
      _id: req.params.id
    })
    .populate('comment')
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
}

// scrape articles from BBC World News
export_articles.scrapeArticles = function (req, res) {

  axios.get("https://www.bbc.com/news/world")
    .then(function (response) {

      // load the response into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);

      // console.log('link \n', $('.pigeon__column.pigeon__colmun--a  a').attr('href'));
      // console.log('title \n', $('.pigeon__column.pigeon__colmun--a  a > h3 > span').text());
      // console.log('img \n', $('.pigeon__column.pigeon__colmun--a img').attr('datasrc'));    
      // console.log('summary \n', $('.pigeon__column.pigeon__colmun--a p').text());
      // console.log('imagea \n', $('.pigeon-item__image').children('img').attr('datasrc'))

// scrape method 1
      let result= {};
      result.link = $('.buzzard-item > a').attr('href');
      result.headline = $('.buzzard-item > a > h3 > span').text();
      result.summary = $('.buzzard-item p').text();
      result.img = $('.buzzard-item img').attr('src');

      console.log('link ', result.link);
      console.log('headline ', result.headline);
      console.log('img ', result.img);    
      console.log('summary ', result.summary);

      //insert to database
      db.Article.create(result)
        .then(articleCreated => console.log(articleCreated))

      $('a.title-link').each(function (i, element) {
        let result = {};
        result.link = $(this).attr('href');
        if (result.link.startsWith('/news/world-')) {
          //result.headline = $(this).children('span.title-link__title-text').text();
          result.headline = $(this, 'span.title-link__title-text').text().trim();
          //result.headline = $(this).children('span').text();
          result.summary = $(this).siblings('p.pigeon-item__summary') ? $(this).siblings('p.pigeon-item__summary').text() : '';
          result.img = $(this).parent().siblings('div.pigeon-item__image').children('img').attr('datasrc');

          console.log(result);
          // create and insert Article to database
          db.Article.create(result)
            .then(articleCreated => console.log(articleCreated))
            //.catch(err => res.json(err));
        }
      })

    .then((req, res) => {

        // scraped and saved articles successfully, let the client know
        //res.send("Scrape completed");
      })
    })

}

module.exports = export_articles;