const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProject" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProject" }],
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("userProject", userSchema);
module.exports = User;
