const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// Serialise a user document to a safe public shape
const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  flatNumber: user.flatNumber,
  accountStatus: user.accountStatus,
  notificationPreferences: user.notificationPreferences,
  createdAt: user.createdAt,
});

// ========================
// REGISTER — residents only
// ========================
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, flatNumber } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return sendError(res, "Name, email and password are required.", 400);
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return sendError(res, "Please provide a valid email address.", 400);
    }

    if (password.length < 6) {
      return sendError(res, "Password must be at least 6 characters.", 400);
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return sendError(res, "An account with this email already exists.", 409);
    }

    // Role is ALWAYS resident on public registration
    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password,
      phone,
      flatNumber,
      role: "resident",
    });

    const token = generateToken(user);

    return sendSuccess(
      res,
      "Registration successful.",
      { token, user: serializeUser(user) },
      201
    );
  } catch (error) {
    next(error);
  }
};

// ========================
// LOGIN
// ========================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return sendError(res, "Email and password are required.", 400);
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return sendError(res, "Invalid email or password.", 401);
    }

    if (user.accountStatus !== "Active") {
      return sendError(res, "Your account has been deactivated. Contact admin.", 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, "Invalid email or password.", 401);
    }

    const token = generateToken(user);

    return sendSuccess(res, "Login successful.", { token, user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
};

// ========================
// GET PROFILE (authenticated)
// ========================
const getProfile = async (req, res, next) => {
  try {
    return sendSuccess(res, "Profile fetched.", serializeUser(req.user));
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE PROFILE (authenticated)
// ========================
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, flatNumber } = req.body;
    const update = {};

    if (name !== undefined) {
      if (!String(name).trim()) return sendError(res, "Name cannot be empty.", 400);
      update.name = String(name).trim();
    }
    if (phone !== undefined) update.phone = String(phone).trim();
    if (flatNumber !== undefined) update.flatNumber = String(flatNumber).trim();

    if (Object.keys(update).length === 0) {
      return sendError(res, "Provide at least one profile field to update.", 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      update,
      { new: true, runValidators: true }
    );

    return sendSuccess(res, "Profile updated successfully.", serializeUser(user));
  } catch (error) {
    next(error);
  }
};

// ========================
// CHANGE PASSWORD (authenticated)
// ========================
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, "Current password and new password are required.", 400);
    }

    if (newPassword.length < 6) {
      return sendError(res, "New password must be at least 6 characters.", 400);
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return sendError(res, "Current password is incorrect.", 401);
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE NOTIFICATION PREFERENCES (authenticated)
// ========================
const updateNotificationPreferences = async (req, res, next) => {
  try {
    const allowedKeys = ["emailNotif", "smsNotif", "pushNotif", "emergencyAlerts"];
    const update = {};

    for (const key of allowedKeys) {
      if (typeof req.body[key] === "boolean") {
        update[`notificationPreferences.${key}`] = req.body[key];
      }
    }

    if (Object.keys(update).length === 0) {
      return sendError(res, "Provide at least one notification preference.", 400);
    }

    const user = await User.findByIdAndUpdate(req.user._id, { $set: update }, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, "Notification preferences updated.", serializeUser(user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  updateNotificationPreferences,
};
