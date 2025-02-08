const mongosse = require("mongoose");
const Joi = require("joi");
const postSchema = new mongosse.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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

//validations

const validateCreatePost = (obj) => {
  const schema = Joi.object({
    text: Joi.string().required().trim(),
    user: Joi.string().required().trim(),
    image: Joi.string(),
    likes: Joi.string(),
    comments: Joi.array().items(
      Joi.object({
        text: Joi.string().when('comments', {
          is: Joi.exist(),
          then: Joi.string().required().trim(),
          otherwise: Joi.string().optional()
        }),
        user: Joi.string().when('comments', {
          is: Joi.exist(),
          then: Joi.string().required(),
          otherwise: Joi.string().optional()
        })
      })
    )
  });
  return schema.validate(obj);
};

const Post = mongosse.model("postProject", postSchema);
module.exports = { Post, validateCreatePost };
