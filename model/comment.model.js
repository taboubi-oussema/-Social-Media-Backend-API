const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProject",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postProject",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
