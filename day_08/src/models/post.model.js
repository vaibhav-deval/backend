const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:[true,"User is required"]
  }
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
