const User = require("../model/user.model");
const asynchandler = require("express-async-handler");

/**
 * @desc Get All Users
 * @route  /api/users
 * @method GET
 * @access public
 */
const GetAllUser = asynchandler(async (req, res) => {
  const users = await User.find();
  if (!users.length) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json(users);
});

/**
 * @desc Get User By ID
 * @route  /api/users/:id
 * @method GET
 * @access public
 */
const GetUserById = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

/**
 * @desc Create New User
 * @route  /api/users
 * @method POST
 * @access public
 */
const CreateNewUser = asynchandler(async (req, res) => {
  const exist = await User.findOne({ email: req.body.email });
  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, // No hashing yet
    profilePicture: req.body.profilePicture,
    bio: req.body.bio,
    followers: req.body.followers,
    following: req.body.following,
  });

  await newUser.save();
  return res
    .status(201)
    .json({ message: "User created successfully", newUser });
});

/**
 * @desc Update User
 * @route  /api/users/:id
 * @method PUT
 * @access public
 */
const UpdateUser = asynchandler(async (req, res) => {
  const exist = await User.findById(req.params.id);
  if (!exist) {
    return res.status(404).json({ message: "User not found" });
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePicture: req.body.profilePicture,
      bio: req.body.bio,
      followers: req.body.followers,
      following: req.body.following,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ message: "User updated successfully", updateUser });
});

/**
 * @desc Delete User
 * @route  /api/users/:id
 * @method DELETE
 * @access public
 */
const DeleteUser = asynchandler(async (req, res) => {
  const exist = await User.findById(req.params.id);
  if (!exist) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
  GetAllUser,
  GetUserById,
  CreateNewUser,
  UpdateUser,
  DeleteUser,
};
