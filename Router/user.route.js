const express = require("express");
const router = express.Router();
const {
  GetAllUser,
  GetUserById,
  CreateNewUser,
  UpdateUser,
  DeleteUser,
  FollowUser
} = require("../controllers/user.controller");

router.route("/users").get(GetAllUser).post(CreateNewUser);
router.route("/users/follow").post(FollowUser)
router
  .get("/users/:id", GetUserById)
  .delete("/users/:id", DeleteUser)
  .put("/users/:id", UpdateUser);

module.exports = router;
