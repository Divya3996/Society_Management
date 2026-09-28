const Complaint = require("../models/Complaint");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// CREATE Complaint (resident)
// ========================
const createComplaint = async (req, res, next) => {
  try {
    const { category, priority, subject, description, location, residentId } = req.body;

    if (!category || !subject || !description) {
      return sendError(res, "Category, subject and description are required.", 400);
    }

    let residentIdToUse = req.user._id;

    if (req.user.role === "admin") {
      if (!residentId) return sendError(res, "Resident ID is required when created by admin.", 400);
      const User = require("../models/User");
      const resident = await User.findById(residentId);
      if (!resident) return sendError(res, "Resident not found.", 404);
      residentIdToUse = resident._id;
    }

    const complaint = await Complaint.create({
      resident: residentIdToUse,
      category,
      priority,
      subject,
      description,
      location,
    });

    await complaint.populate("resident", "name email flatNumber");

    return sendSuccess(res, "Complaint submitted successfully.", complaint, 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET All Complaints
// Admin: all | Resident: own only
// ========================
const getComplaints = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { resident: req.user._id };

    const complaints = await Complaint.find(filter)
      .populate("resident", "name email flatNumber")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Complaints fetched.", complaints);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Single Complaint
// ========================
const getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "resident",
      "name email flatNumber"
    );

    if (!complaint) return sendError(res, "Complaint not found.", 404);

    // Resident can only see their own
    if (
      req.user.role === "resident" &&
      complaint.resident._id.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    return sendSuccess(res, "Complaint fetched.", complaint);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Complaint Status (admin)
// ========================
const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, adminRemarks } = req.body;
    const validStatuses = ["Pending", "In Progress", "Resolved", "Rejected"];

    if (!validStatuses.includes(status)) {
      return sendError(res, `Status must be one of: ${validStatuses.join(", ")}.`, 400);
    }

    const update = { status, adminRemarks };
    if (status === "Resolved") update.resolvedAt = new Date();

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).populate("resident", "name email flatNumber");

    if (!complaint) return sendError(res, "Complaint not found.", 404);

    return sendSuccess(res, "Complaint status updated.", complaint);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Complaint (admin or owner)
// ========================
const updateComplaint = async (req, res, next) => {
  try {
    const { category, priority, subject, description, location } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return sendError(res, "Complaint not found.", 404);

    if (
      req.user.role !== "admin" &&
      complaint.resident.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    if (req.user.role === "resident" && complaint.status !== "Pending") {
      return sendError(res, "Only pending complaints can be deleted.", 400);
    }

    if (req.user.role !== "admin" && complaint.status !== "Pending") {
      return sendError(res, "Only pending complaints can be updated.", 400);
    }

    if (category) complaint.category = category;
    if (priority) complaint.priority = priority;
    if (subject) complaint.subject = subject;
    if (description) complaint.description = description;
    if (location !== undefined) complaint.location = location;

    await complaint.save();
    await complaint.populate("resident", "name email flatNumber");

    return sendSuccess(res, "Complaint updated successfully.", complaint);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Complaint (admin or owner)
// ========================
const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return sendError(res, "Complaint not found.", 404);

    if (
      req.user.role !== "admin" &&
      complaint.resident.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    await complaint.deleteOne();

    return sendSuccess(res, "Complaint deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
};
