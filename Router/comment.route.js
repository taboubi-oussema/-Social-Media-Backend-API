const express = require("express");
const router = express.Router();
const {
  GetAllComments,
  GetCommentById,
  CreateNewComment,
  UpdateComment,
  DeleteComment,
} = require("../controllers/comment.controller");

router.route("/comments").get(GetAllComments).post(CreateNewComment);

router
  .route("/comments/:id")
  .get(GetCommentById)
  .delete(DeleteComment)
  .put(UpdateComment);

module.exports = router;
