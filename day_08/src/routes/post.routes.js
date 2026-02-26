const express = require("express");
const postModel = require("../models/post.model");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/details/:postId",postController.getPostById);


module.exports = postRouter;
