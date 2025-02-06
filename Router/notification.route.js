const express = require("express");
const router = express.Router();
const {
  GetAllNotifications,
  GetNotificationById,
  CreateNewNotification,
  UpdateNotification,
  DeleteNotification,
} = require("../controllers/notification.controller");

router
  .route("/notifications")
  .get(GetAllNotifications)
  .post(CreateNewNotification);

router
  .get("/notifications/:id", GetNotificationById)
  .delete("/notifications/:id", DeleteNotification)
  .put("/notifications/:id", UpdateNotification);

module.exports = router;
