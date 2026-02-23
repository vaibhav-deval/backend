const express = require("express");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({ name, email, password: hash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({ message: "Protected route accessed successfully" });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found with this email",
    });
  }

  const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");;

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "Login successful",
    user,
  });
});
module.exports = authRouter;
