const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },

  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    select:false,
  },

  bio: String,

  profilePicture: {
    type: String,
    default: "https://ik.imagekit.io/threefree/pro.jpg",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
