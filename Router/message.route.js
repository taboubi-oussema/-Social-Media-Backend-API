const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const router = express.Router();
const {
  GetAllMessages,
  GetMessageById,
  CreateMessage,
  UpdateMessage,
  DeleteMessage,
} = require("../controllers/message.controller.js");

router
  .route("/message")
  .get(verifyTokenAndAdmin, GetAllMessages)
  .post(CreateMessage);
router
  .route("/message/:id")
  .get(verifyTokenAndAuthorization, GetMessageById)
  .put(verifyTokenAndAuthorization, UpdateMessage)
  .delete(verifyTokenAndAuthorization, DeleteMessage);

module.exports = router;
