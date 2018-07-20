const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers");         //(['array', 'comparison', 'date', 'html', 'string']);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 8080;

const app = express();
const hbsEngine = exphbs.create({
  extname: "hbs",
  defaultLayout: "main.hbs",
  helpers: {
    array: helpers.array(),
    comparison: helpers.comparison(), 
    date: helpers.date(),
    html: helpers.html(),
    string: helpers.string()
  },
  partialsDir: ['views/partials']
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", hbsEngine.engine);
app.set("view engine", "hbs");

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//const articlesRoute = require('./routes/articles_route');
const routes = require('./routes/index');

app.use('/', routes);
app.use('/articles', routes);

//app.use('/', articlesRoute);
// app.use('/', articlesRoute);
// app.use('/scrape', articlesRoute);
//app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// database setup
const db = require('./models');
mongoose.connect("mongodb://localhost/BbcArticles")

// start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


module.exports = app;
