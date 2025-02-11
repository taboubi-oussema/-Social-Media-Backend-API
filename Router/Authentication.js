const {
  User,
  validationCreatUser,
  validationLoginUser,
} = require("../model/user.model");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * @desc Create New User
 * @route  /api/users
 * @method POST
 * @access public
 */
const CreateNewUser = asynchandler(async (req, res) => {
  const { error } = validationCreatUser(req.body);
  const exist = await User.findOne({
    email: req.body.email,
    username: req.body.username,
  });
  const existingUser = await User.findOne({ email: req.body.email });

  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (existingUser)
    return res.status(400).json({ error: "Email is already registered" });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture,
    bio: req.body.bio,
    followers: req.body.followers,
    following: req.body.following,
  });

  const result = await newUser.save();
  const token = jwt.sign(
    { email: req.body.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  const { password, ...other } = result._doc;
  return res
    .status(201)
    .json({ message: "User created successfully", ...other, token });
});

/**
 * @desc Longin User
 * @route  /api/users
 * @method POST
 * @access public
 */
const Login = asynchandler(async (req, res) => {
  const { error } = validationLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser)
    return res.status(400).json({ error: "invalid Email or Password " });
  const passMatch = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!passMatch)
    return res.status(400).json({ error: "invalid Email or Password " });
  const { password, ...other } = existingUser._doc;
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return res
    .status(201)
    .json({ message: "Login successfully", ...other, token });
});

module.exports = {
  CreateNewUser,
  Login,
};
