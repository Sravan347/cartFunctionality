const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url)
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    
  }
};

module.exports = connectDB;
