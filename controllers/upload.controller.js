const multer = require("multer");
const path = require("path");
const { User } = require("../model/user.model");
const fs = require("fs");

// Create a temporary storage for files that haven't been validated yet
const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../temp"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, "-");
    cb(null, `${uniqueSuffix}-${sanitizedFilename}`);
  },
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.allowed = false;
    cb(null, false);
  }
};

const uploadImage = multer({
  storage: tempStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
}).single("image");

const upload = async (req, res) => {
  try {
    if (req.allowed === false) {
      return res.status(400).json({ message: "Only image files are allowed!" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!req.query?.id) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user ID exists in request and database

    const userExists = await User.findById(req.query.id);
    if (!userExists) {
      // Remove the temporary file if user doesn't exist
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "User not found" });
    }

    // Move the file from temp to permanent storage only if user exists
    const finalPath = path.join(__dirname, "../images", req.file.filename);
    fs.renameSync(req.file.path, finalPath);

    // Update user's profile picture in database
    const updatedUser = await User.findByIdAndUpdate(
      req.query.id,
      { profilePicture: req.file.filename },
      { new: true }
    );

    return res.status(200).json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      path: `/images/${req.file.filename}`,
      user: updatedUser,
    });
  } catch (error) {
    // Clean up any temporary files if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { upload, uploadImage };
