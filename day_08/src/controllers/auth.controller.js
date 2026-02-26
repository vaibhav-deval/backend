const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  console.log(req.body);

  const { name, username, email, password, bio, profilePicture } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserExists) {
    return res.status(400).json({
      message:
        "User already exists" +
        (isUserExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    username,
    email,
    password: hash,
    bio,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (!user) {
    return res.status(409).json({ message: "user not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(409).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
  });
}

module.exports = { registerController, loginController };
