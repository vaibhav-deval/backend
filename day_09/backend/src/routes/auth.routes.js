const express = require("express");
const authControllers = require("../controllers/auth.controller");
const identifyMiddleware = require("../middlewares/auth.middleware");

const authRouter = express.Router();
authRouter.post("/register", authControllers.registerController);
authRouter.post("/login", authControllers.loginController);

authRouter.get(
  "/me",
  identifyMiddleware,
  authControllers.getCurrentUserController,
);

module.exports = authRouter;
