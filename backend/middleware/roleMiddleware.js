const { sendError } = require("../utils/responseHandler");

/**
 * Role-based authorization middleware factory.
 * Usage: authorize("admin") or authorize("admin", "resident")
 * Must be used AFTER the protect middleware.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, "Not authenticated.", 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied. This route requires one of the following roles: ${roles.join(", ")}.`,
        403
      );
    }

    next();
  };
};

module.exports = { authorize };
