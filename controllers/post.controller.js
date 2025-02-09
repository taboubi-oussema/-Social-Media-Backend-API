const { Post, validateCreatePost } = require("../model/post.model");
const { User } = require("../model/user.model");
const asyncHandler = require("express-async-handler");

/**
 * @desc Get All Posts
 * @route /api/posts
 * @method GET
 * @access public
 */
const GetAllPosts = asyncHandler(async (req, res) => {
  try {
    const getPosts = await Post.find();
    if (!getPosts.length) {
      return res.status(404).json({ message: "No Post found" });
    }
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: "Error Get post", error: error.message });
  }
});

/**
 * @desc Get Post By Id
 * @route /api/posts
 * @method GetById
 * @access public
 */

const GetPostById = asyncHandler(async (req, res) => {
  try {
    const getPosts = await Post.findById(req.params.id);
    if (!getPosts) {
      return res.status(404).json({ message: "No Post found" });
    }
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: "Error Get post", error: error.message });
  }
});

/**
 * @desc Create New Post
 * @route /api/posts
 * @method POST
 * @access public
 */

const CreateNewPost = asyncHandler(async (req, res) => {
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const userFound = await User.findOne({ _id: req.body.user });
    if (!userFound) {
      return res.status(404).json({ message: "user not found" });
    }

    if (
      req.body.comments &&
      Array.isArray(req.body.comments) &&
      req.body.comments.length > 0
    ) {
      for (const comment of req.body.comments) {
        const commentUserFound = await User.findById(comment.user);
        if (!commentUserFound) {
          return res
            .status(404)
            .json({ message: `User ${comment.user} not found` });
        }
        if (!comment.text?.trim()) {
          return res.status(400).json({
            message: "text is required for comment",
          });
        }
      }

      var newPost = new Post({
        text: req.body.text,
        user: req.body.user,
        image: req.body.image,
        likes: req.body.likes,
        comments: req.body.comments.map((comment) => ({
          text: comment.text,
          user: comment.user,
        })),
      });
    } else if (req.body.comments?.length === 0) {
      return res.status(400).json({
        message: "Comments array cannot be empty UserID is required",
      });
    } else {
      var newPost = new Post({
        text: req.body.text,
        user: req.body.user,
        image: req.body.image,
        likes: req.body.likes,
      });
    }
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
});

/**
 * @desc Update Post
 * @route /api/posts
 * @method PUT
 * @access public
 */

const UpdatePost = asyncHandler(async (req, res) => {
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const postFound = await Post.findById(req.params.id);
    if (!postFound) {
      res.status(200).json({ message: "Post not found" });
    }
    const userFound = await User.findOne({ _id: req.body.user });
    if (!userFound) {
      return res.status(404).json({ message: "user not found" });
    }
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text || Post.text,
        user: req.body.user || Post.user,
        image: req.body.image || Post.image,
        likes: req.body.likes || Post.likes,
        comments: req.body.comments.map((comment) => ({
          text: comment.text || Post.comments.text,
          user: comment.user || Post.comments.user,
        })),
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Post updated successfully", post: updatePost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
});

/**
 * @desc Delete Post
 * @route /api/posts
 * @method DELETE
 * @access public
 */

const DeletePost = asyncHandler(async (req, res) => {
  try {
    const getPosts = await Post.findById(req.params.id);
    if (!getPosts) {
      return res.status(404).json({ message: "No Post found" });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Delete post", error: error.message });
  }
});

module.exports = {
  GetAllPosts,
  GetPostById,
  CreateNewPost,
  UpdatePost,
  DeletePost,
};
