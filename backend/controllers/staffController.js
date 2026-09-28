const Staff = require("../models/Staff");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// CREATE Staff (admin)
// ========================
const createStaff = async (req, res, next) => {
  try {
    const { name, role, phone, email, salary, joinDate, shift } = req.body;

    if (!name || !role) {
      return sendError(res, "Name and role are required.", 400);
    }

    const staff = await Staff.create({
      name,
      role,
      phone,
      email,
      salary,
      joinDate,
      shift,
      addedBy: req.user._id,
    });

    return sendSuccess(res, "Staff member added.", staff, 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET All Staff (admin)
// ========================
const getAllStaff = async (req, res, next) => {
  try {
    const staff = await Staff.find()
      .populate("addedBy", "name")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Staff fetched.", staff);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Staff by ID (admin)
// ========================
const getStaffById = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("addedBy", "name");
    if (!staff) return sendError(res, "Staff member not found.", 404);
    return sendSuccess(res, "Staff fetched.", staff);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Staff (admin)
// ========================
const updateStaff = async (req, res, next) => {
  try {
    const { name, role, phone, email, salary, shift, status } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, role, phone, email, salary, shift, status },
      { new: true, runValidators: true }
    );

    if (!staff) return sendError(res, "Staff member not found.", 404);

    return sendSuccess(res, "Staff updated.", staff);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Staff (admin)
// ========================
const deleteStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return sendError(res, "Staff member not found.", 404);
    return sendSuccess(res, "Staff member removed.");
  } catch (error) {
    next(error);
  }
};

module.exports = { createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff };
