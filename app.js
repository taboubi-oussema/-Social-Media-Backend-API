// Import core modules
const express = require("express");
const app = express();

//malwaires
app.use(express.json());

// Import database configuration
const { connectDB } = require("./config/db");

// Loads .env file contents into process.env
require("dotenv").config();

// Database Connection

connectDB();

app.use("/api", require("./Router/user.route"));
app.use("/api", require("./Router/post.route"));
app.use("/api", require("./Router/notification.route"));
app.use("/api", require("./Router/comment.route"));
app.use("/api", require("./Router/message.route"));

// Server Initialization
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode`);
  console.log(`Server listening on port ${process.env.PORT}`);
  console.log(`API Documentation: http://localhost:${process.env.PORT}/api`);
});
