const mongoose = require("mongoose");

function connectToDB(URI) {
  mongoose.connect(URI).then(() => {
    console.log("database connected successfully");
  });
}

module.exports = connectToDB;
