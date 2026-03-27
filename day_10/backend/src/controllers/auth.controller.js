const userModel = require("../models/user.model");

const redis = require("../config/cache");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({
      message: "Username or email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  return res.status(201).json({
    message: "User registered successfully",
    user: {},
  });
}

async function loginUser(req, res) {
  const { email, password, username } = req.body;
  const user = await userModel
    .findOne({ $or: [{ email }, { username }] })
    .select("+password");
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or username",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    user,
    message: "User Fetched ",
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "user logged out successfully ",
  });
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
