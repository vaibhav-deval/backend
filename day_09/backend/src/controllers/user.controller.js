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

async function getFollowingController(req, res) {
  try {
    const username = req.user.username;

    // Get all users that the current user is following
    const following = await followModel
      .find({ follower: username })
      .select("followee");

    // Get the full user details for each person being followed
    const followingUsernames = following.map((follow) => follow.followee);
    const followingUsers = await userModel
      .find({ username: { $in: followingUsernames } })
      .select("-password");

    res.status(200).json({
      message: "Following list retrieved successfully",
      count: followingUsers.length,
      following: followingUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving following list",
      error: error.message,
    });
  }
}

async function getSuggestionsController(req, res) {
  try {
    const username = req.user.username;
    const limit = 10;

    // Get all users currently followed by the logged-in user
    const followingRecords = await followModel
      .find({ follower: username })
      .select("followee");

    const followeeUsernames = followingRecords.map((record) => record.followee);

    // Get all users except the current user and those already followed
    const suggestions = await userModel
      .find({
        username: {
          $nin: [...followeeUsernames, username], // Exclude followed users and self
        },
      })
      .select("-password")
      .limit(limit);

    res.status(200).json({
      message: "Suggestions retrieved successfully",

      suggestions: suggestions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving suggestions", error: error.message });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  getFollowingController,
  getSuggestionsController,
};
