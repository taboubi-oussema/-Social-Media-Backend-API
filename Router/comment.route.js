const express = require("express");
const router = express.Router();
const {
  GetAllComments,
  GetCommentById,
  CreateNewComment,
  UpdateComment,
  DeleteComment,
} = require("../controllers/comment.controller");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

router.route("/comments").get(verifyTokenAndAdmin,GetAllComments).post(CreateNewComment);

router
  .route("/comments/:id")
  .get(verifyTokenAndAuthorization,GetCommentById)
  .delete(verifyTokenAndAuthorization,DeleteComment)
  .put(verifyTokenAndAuthorization,UpdateComment);

module.exports = router;
