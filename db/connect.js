const mongoose = require("mongoose");

const connectDB = async (uri) => {
  return mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectDB;



