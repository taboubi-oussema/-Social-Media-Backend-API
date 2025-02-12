const mongoose = require("mongoose");
const joi = require("joi");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: String, default: false },
  profilePicture: { type: String, default: "image.png" },
  bio: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProject" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProject" }],
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("userProject", userSchema);

//validations
const validationCreatUser = (obj) => {
  const schema = joi.object({
    username: joi.string().required().trim(),
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return schema.validate(obj);
};
const validationLoginUser = (obj) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return schema.validate(obj);
};
module.exports = { User, validationCreatUser, validationLoginUser };
