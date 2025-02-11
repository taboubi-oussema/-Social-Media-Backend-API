const { User, validationCreatUser } = require("../model/user.model");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

/**
 * @desc Get All Users
 * @route  /api/users
 * @method GET
 * @access public
 */
const GetAllUser = asynchandler(async (req, res) => {
  // const users = await User.find().populate("followers").populate("following");
  const users = await User.find().select("-password");
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
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});



/**
 * @desc Update User
 * @route  /api/users/:id
 * @method PUT
 * @access public
 */
const UpdateUser = asynchandler(async (req, res) => {
  const { error } = validationCreatUser(req.body);
  const existingEmail = await User.findOne({ email: req.body.email });
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  if (existingEmail)
    return res.status(400).json({ error: "Email is already registered" });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username || User.username,
      email: req.body.email || User.email,
      password: req.body.password || User.password,
      profilePicture: req.body.profilePicture || User.profilePicture,
      bio: req.body.bio || User.bio,
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

/**
 * @desc Follow User
 * @route  /api/users/follow
 * @method POST
 * @access public
 */

const FollowUser = asynchandler(async (req, res) => {
  const { _id, following } = req.body;

  const followerFound = await User.findById(_id);
  if (!followerFound) {
    return res.status(404).json({ message: "Followed user not found" });
  }
  const followingFound = await User.findById(following);
  if (!followingFound) {
    return res.status(404).json({ message: "Following user not found" });
  }
  if (followerFound.following.includes(following.toString())) {
    followerFound.following = followerFound.following.filter(
      (id) => id.toString() !== following.toString()
    );
    followingFound.followers = followingFound.followers.filter(
      (id) => id.toString() !== _id
    );

    await followerFound.save();
    await followingFound.save();
    return res
      .status(400)
      .json({ message: ` unfollowing the user : ${followingFound.username}` });
  }

  followerFound.following.push(following);
  followingFound.followers.push(_id);
  await followerFound.save();
  await followingFound.save();
  return res.status(200).json({
    message: `${followerFound.username} followed ${followingFound.username} successfully`,
    _id,
    following,
  });
});

module.exports = {
  GetAllUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
  FollowUser,
};
