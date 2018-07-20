const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const export_articles = module.exports = {};

//get all articles
export_articles.allArticles = function (req, res) {

  db.Article.find({})
    .then(dbArticle => res.json(dbArticle))
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

        // // then grab what we need
        // $('.title-link').each((i, element) => {
        //   const result = {};
        //   result.link = $(this).attr('href');
        //   result.title = $(this).find('.title-link__title-text').text();
        //   result.summary = $(this).find()
        // })
// scrape method 1
        // $('a.title-link').each(function (i, element) {
        //   var result = {};
        //   result.link = $(this).attr('href').trim();
        //   if (result.link.startsWith('/news/world-')) {
        //     result.headline = $(this, 'span.title-link__title-text').text().replace('\n', '').trim();
        //     result.summary = $(this).siblings('p.pigeon-item__summary') ? $(this).siblings('p.pigeon-item__summary').text().trim() : '';

        //     console.log(result);
        //     // create and insert Article to database
        //     db.Article.create(result)
        //       .then(articleCreated => console.log(articleCreated))
        //       .catch(err => res.json(err));
        //   }
        // })

// scrape method 2
        $('a.title-link').each(function (i, element) {
          var result = {};
          console.log('img \n', $('.buzzard-item img').attr('src'));

          result.img = $(this).parents().siblings('div.pigeon-item__image').children('img').attr('src');
          result.link = $(this).attr('href').trim();
          if (result.link.startsWith('/news/world-')) {
            result.headline = $(this, 'span.title-link__title-text').text().replace('\n', '').trim();
            result.summary = $(this).siblings('p.pigeon-item__summary') ? $(this).siblings('p.pigeon-item__summary').text().trim() : '';

            console.log(result);
            // create and insert Article to database
            db.Article.create(result)
              .then(articleCreated => console.log(articleCreated))
              .catch(err => res.json(err));
          }
        })

      })
      // .then((req, res) => {

      //     // scraped and saved articles successfully, let the client know
      //     //res.send("Scrape completed");
      //   })
      }

    module.exports = export_articles;