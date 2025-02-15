const express = require("express");
const router = express.Router();
const { upload, uploadImage } = require("../controllers/upload.controller");
router.route("/upload").post(uploadImage, upload);

module.exports = router;
