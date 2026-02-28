const postModel = require("../models/post.model");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  const userId = req.user.id;
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "instagram-clone",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: userId,
  });

  res.status(201).json({ message: "Post created successfully", post });
}

async function getPosts(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({ message: "Posts fetched successfully", posts });
}

async function getPostById(req, res) {
  const userId = req.user.id;

  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({ message: "Forbidden access" });
  }

  res.status(200).json({ message: "Post fetched successfully", post });
}

async function likePost(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const isAlreadyLiked = await likeModel.findOne({ post: postId, user: req.user.username });
  if (isAlreadyLiked) {
    return res.status(200).json({ message: "Post already liked" });
  }

  const likedPost = await likeModel.create({
    post: postId,
    user: req.user.username,
  });

  res.status(200).json({ message: "Post liked successfully", likedPost });
}

module.exports = { createPost, getPosts, getPostById, likePost };
