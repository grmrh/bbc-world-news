const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: false
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;