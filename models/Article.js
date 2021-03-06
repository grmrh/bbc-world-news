const mongoose = require('mongoose');

//save a reference to the Schema constructor
const Schema = mongoose.Schema;

//create a new ArticleSchema
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    index: true}, 
  summary: {
    type: String,
    required: false},
  link: {
    type: String,
    required: true,
    unique: true},
  img: {
    type: String,
    required: false},
  dateInserted: {
    type: Date,
    default: Date.now
  },

  /**
   * `comment` is an object that stores a Comment id. The ref property links the ObjectId to the Comment model
   * This allows us to populate the Article with an associated Comment
   */
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

//now create an article collection out of the definition above
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;