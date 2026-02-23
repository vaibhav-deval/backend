const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB");
  });
};

module.exports = connectDB;
