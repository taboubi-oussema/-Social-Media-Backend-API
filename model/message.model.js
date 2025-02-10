const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProject",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProject",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const messageJoiSchema = (obj) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
  });
  return schema.validate(obj);
};

const Message = mongoose.model("messageProject", messageSchema);
module.exports = { Message, messageJoiSchema };
