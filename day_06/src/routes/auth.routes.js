const express = require("express");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      message: "user already exists",
    });
  }
  const user = await userModel.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully",
    user,
    token,
  });
});

module.exports = authRouter;
