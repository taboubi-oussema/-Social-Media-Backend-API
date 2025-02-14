const express = require("express");
const router = express.Router();
const {
  GetAllNotifications,
  GetNotificationById,
  CreateNewNotification,
  UpdateNotification,
  DeleteNotification,
} = require("../controllers/notification.controller");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

router
  .route("/notifications")
  .get(verifyTokenAndAdmin,GetAllNotifications)
  .post(CreateNewNotification);

router
  .get("/notifications/:id",verifyTokenAndAuthorization, GetNotificationById)
  .delete("/notifications/:id",verifyTokenAndAuthorization, DeleteNotification)
  .put("/notifications/:id",verifyTokenAndAuthorization, UpdateNotification);

module.exports = router;
