const express = require("express");
const router = express.Router();
const {
  GetAllPosts,
  GetPostById,
  CreateNewPost,
  UpdatePost,
  DeletePost,
} = require("../controllers/post.controller");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

router.route("/posts").get(verifyTokenAndAdmin,GetAllPosts).post(CreateNewPost);

router
  .get("/posts/:id", verifyTokenAndAuthorization,GetPostById)
  .delete("/posts/:id",verifyTokenAndAuthorization, DeletePost)
  .put("/posts/:id", verifyTokenAndAuthorization,UpdatePost);

module.exports = router;
