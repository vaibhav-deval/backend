const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { authUser };
