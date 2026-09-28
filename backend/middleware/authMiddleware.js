const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendError } = require("../utils/responseHandler");

/**
 * Middleware to protect routes — verifies the Bearer JWT token
 * and attaches the authenticated user to req.user.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, "Not authorized. No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data (exclude password)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return sendError(res, "User not found. Token is invalid.", 401);
    }

    if (user.accountStatus !== "Active") {
      return sendError(res, "Your account has been deactivated.", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return sendError(res, "Token has expired. Please login again.", 401);
    }
    if (error.name === "JsonWebTokenError") {
      return sendError(res, "Invalid token.", 401);
    }
    return sendError(res, "Authentication failed.", 401);
  }
};

module.exports = { protect };
