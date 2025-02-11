const express = require("express");
const router = express.Router();
const {

  CreateNewUser,
  Login,

} = require("./Authentication");
const {
  GetAllUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
  FollowUser
} = require("../controllers/user.controller");


router.route("/register").post(CreateNewUser);
router.route("/login").post(Login);
router.route("/users").get(GetAllUser);
router.route("/users/follow").post(FollowUser)
router
  .get("/users/:id", GetUserById)
  .delete("/users/:id", DeleteUser)
  .put("/users/:id", UpdateUser);

module.exports = router;
