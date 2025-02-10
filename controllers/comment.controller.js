const { Comment, commentJoiSchema } = require("../model/comment.model");
const asynchandler = require("express-async-handler");
const { User } = require("../model/user.model");
const { Post } = require("../model/post.model");

/**
 * @desc Get All Comments
 * @route  /api/comments
 * @method GET
 * @access public
 */
const GetAllComments = asynchandler(async (req, res) => {
  try {
    const comments = await Comment.find().populate("user post");
    if (!comments.length) {
      return res.status(404).json({ message: "No comments found" });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Get Comment By ID
 * @route  /api/comments/:id
 * @method GET
 * @access public
 */
const GetCommentById = asynchandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("user post");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Create New Comment
 * @route  /api/comments
 * @method POST
 * @access public
 */
const CreateNewComment = asynchandler(async (req, res) => {
  try {
    const { error } = commentJoiSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.body.user);
    const post = await Post.findById(req.body.post);

    if (!user || !post) {
      return res.status(404).json({ message: "User or Post not found" });
    }

    const newComment = new Comment({
      content: req.body.content,
      user: req.body.user,
      post: req.body.post,
    });

    await newComment.save();
    return res.status(201).json({
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Update Comment
 * @route  /api/comments/:id
 * @method PUT
 * @access public
 */
const UpdateComment = asynchandler(async (req, res) => {
  try {
    const existingComment = await Comment.findById(req.params.id);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content || existingComment.content,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Delete Comment
 * @route  /api/comments/:id
 * @method DELETE
 * @access public
 */
const DeleteComment = asynchandler(async (req, res) => {
  try {
    const exist = await Comment.findById(req.params.id);
    if (!exist) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  GetAllComments,
  GetCommentById,
  CreateNewComment,
  UpdateComment,
  DeleteComment,
};
