const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connect to mongoDB..!");
  } catch (error) {
    console.error("Error connecting to MongoDB:");
    process.exit(1);
  }
};
module.exports = { connectDB };
