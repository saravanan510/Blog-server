const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log("error in MongoDB connection");
  }
};

module.exports = connectdb;
