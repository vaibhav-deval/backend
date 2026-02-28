const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerName = req.user.username;
  const followeeName = req.params.username;

  const isFolloweeExist = await userModel.findOne({ username: followeeName });
  if (!isFolloweeExist) {
    return res.status(404).json({ message: "User to follow not found" });
  }
  if (followerName == followeeName) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const existingFollow = await followModel.findOne({
    follower: followerName,
    followee: followeeName,
  });

  if (existingFollow) {
    return res
      .status(200)
      .json({ message: `You are already following ${followeeName}` });
  }
  const followRecord = await followModel.create({
    follower: followerName,
    followee: followeeName,
  });

  res.status(201).json({
    message: `${followerName} is now following ${followeeName}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerName = req.user.username;
  const followeeName = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerName,
    followee: followeeName,
  });

  if (!isUserFollowing) {
    return res
      .status(200)
      .json({ message: `You are not following ${followeeName}` });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeName}`,
  });
}

module.exports = { followUserController, unfollowUserController };
