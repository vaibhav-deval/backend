const express = require("express");
const postModel = require("../models/post.model");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPost,
);
postRouter.get("/",identifyUser, postController.getPosts);
postRouter.get("/details/:postId", identifyUser, postController.getPostById);

postRouter.post("/like/:postId", identifyUser, postController.likePost);

module.exports = postRouter;
