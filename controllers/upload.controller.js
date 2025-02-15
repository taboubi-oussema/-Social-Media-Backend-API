const multer = require("multer");
const path = require("path");

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
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
  storage: store,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
}).single("image");

const upload = (req, res) => {
  try {
    if (req.allowed=== false) {
      return res.status(500).json({ message: "Only image files are allowed!" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(200).json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      path: `/images/${req.file.filename}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { upload, uploadImage };
