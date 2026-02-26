const postModel = require("../models/post.model");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token Not Provided,Unauthorized access" });
  }
  let decoded=null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid Token,Unauthorized access" });
  }
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "instagram-clone",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({ message: "Post created successfully", post });
}

module.exports = { createPost };
