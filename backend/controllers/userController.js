const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Maintenance = require("../models/Maintenance");
const Parking = require("../models/Parking");
const Visitor = require("../models/Visitor");
const Vote = require("../models/Vote");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  flatNumber: user.flatNumber,
  accountStatus: user.accountStatus,
  createdAt: user.createdAt,
});

// ========================
// GET All Residents (admin)
// ========================
const getAllResidents = async (req, res, next) => {
  try {
    const residents = await User.find({ role: "resident" })
      .select("-password")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Residents fetched.", residents.map(serializeUser));
  } catch (error) {
    next(error);
  }
};

// ========================
// GET User by ID (admin)
// ========================
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: "resident" }).select("-password");
    if (!user) return sendError(res, "User not found.", 404);
    return sendSuccess(res, "User fetched.", serializeUser(user));
  } catch (error) {
    next(error);
  }
};

// ========================
// CREATE Resident (admin — bypasses public registration to allow admin creation)
// ========================
const createResident = async (req, res, next) => {
  try {
    const { name, email, password, phone, flatNumber } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return sendError(res, "Name, email and password are required.", 400);
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return sendError(res, "Please provide a valid email address.", 400);
    }

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return sendError(res, "Email already in use.", 409);

    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password,
      phone,
      flatNumber,
      role: "resident",
    });

    return sendSuccess(res, "Resident created.", serializeUser(user), 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Resident (admin)
// ========================
const updateUser = async (req, res, next) => {
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
      return sendError(res, "Provide at least one field to update.", 400);
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: "resident" },
      update,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return sendError(res, "User not found.", 404);

    return sendSuccess(res, "User updated.", serializeUser(user));
  } catch (error) {
    next(error);
  }
};

// ========================
// TOGGLE Account Status (admin)
// ========================
const toggleStatus = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: "resident" });
    if (!user) return sendError(res, "User not found.", 404);

    user.accountStatus = user.accountStatus === "Active" ? "Inactive" : "Active";
    await user.save();

    return sendSuccess(
      res,
      `User account ${user.accountStatus === "Active" ? "activated" : "deactivated"}.`,
      serializeUser(user)
    );
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE User (admin)
// ========================
const deleteUser = async (req, res, next) => {
  try {
    const residentId = req.params.id;
    const [complaints, bills, parking, visitors, votes] = await Promise.all([
      Complaint.countDocuments({ resident: residentId }),
      Maintenance.countDocuments({ resident: residentId }),
      Parking.countDocuments({ resident: residentId }),
      Visitor.countDocuments({ resident: residentId }),
      Vote.countDocuments({ user: residentId }),
    ]);

    if (complaints + bills + parking + visitors + votes > 0) {
      return sendError(
        res,
        "This resident has activity records and cannot be deleted. Deactivate the account instead to preserve society history.",
        409
      );
    }

    const user = await User.findOneAndDelete({ _id: req.params.id, role: "resident" });
    if (!user) return sendError(res, "User not found.", 404);
    return sendSuccess(res, "User deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllResidents,
  getUserById,
  createResident,
  updateUser,
  toggleStatus,
  deleteUser,
};
