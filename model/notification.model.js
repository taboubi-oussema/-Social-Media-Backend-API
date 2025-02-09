const mongoose = require("mongoose");
const Joi = require("joi");
const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProject",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const notificationJoiSchema = (obj) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    message: Joi.string().required(),
    read: Joi.boolean().default(false),
    createdAt: Joi.date().default(Date.now),
  });
  return schema.validate(obj);
};
const Notification = mongoose.model("notificationProject", notificationSchema);
module.exports = { Notification, notificationJoiSchema };
