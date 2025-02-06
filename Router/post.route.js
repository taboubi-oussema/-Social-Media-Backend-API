const express = require("express");
const router = express.Router();
const {
  GetAllPosts,
  GetPostById,
  CreateNewPost,
  UpdatePost,
  DeletePost,
} = require("../controllers/post.controller");

router.route("/posts").get(GetAllPosts).post(CreateNewPost);

router
  .get("/posts/:id", GetPostById)
  .delete("/posts/:id", DeletePost)
  .put("/posts/:id", UpdatePost);

module.exports = router;
