const express = require("express");

const router = express.Router();
const {
  GetAllMessages,
  GetMessageById,
  CreateMessage,
  UpdateMessage,
  DeleteMessage,
} = require("../controllers/message.controller.js");

router.route("/message").get(GetAllMessages).post(CreateMessage);
router
  .route("/message/:id")
  .get(GetMessageById)
  .put(UpdateMessage)
  .delete(DeleteMessage);

module.exports = router;
