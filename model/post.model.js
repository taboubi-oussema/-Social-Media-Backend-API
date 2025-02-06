const mongosse = require("mongoose");
const postSchema = new mongosse.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "image.png",
  },
  user: {
    type: mongosse.Schema.Types.ObjectId,
    ref: "userProject",
    required: true,
  },
  likes: [
    {
      type: mongosse.Schema.Types.ObjectId,
      ref: "userProject",
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongosse.Schema.Types.ObjectId,
        ref: "userProject",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post = mongosse.model("postProject", postSchema);
module.exports = Post;
