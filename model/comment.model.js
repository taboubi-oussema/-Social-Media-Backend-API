const mongoose = require("mongoose");
const Joi = require("joi");

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

const commentJoiSchema = (obj) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    user: Joi.string().required(),
    post: Joi.string().required(),
  });
  return schema.validate(obj);
};

const Comment = mongoose.model("commentProject", commentSchema);
module.exports = { Comment, commentJoiSchema };
