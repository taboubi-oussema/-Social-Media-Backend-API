const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const { CreateNewUser, Login } = require("./Authentication");
const {
  GetAllUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
  FollowUser,
} = require("../controllers/user.controller");
const { upload, uploadImage } = require("../controllers/upload.controller");

router.route("/register").post(CreateNewUser);
router.route("/login").post(Login);
router.route("/users").get(verifyTokenAndAdmin, GetAllUser);
router.route("/users/follow").post(FollowUser);

router.route("/users/upload").post(uploadImage, upload);
router
  .route("/users/:id")
  .get(verifyTokenAndAuthorization, GetUserById)
  .delete(verifyTokenAndAuthorization, DeleteUser)
  .put(verifyTokenAndAuthorization, UpdateUser);

module.exports = router;
