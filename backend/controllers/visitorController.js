const Visitor = require("../models/Visitor");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// CREATE / Invite Visitor (resident)
// ========================
const createVisitor = async (req, res, next) => {
  try {
    const { name, phone, purpose, vehicleNumber, expectedDate, notes, residentId } = req.body;

    if (!name || !purpose) {
      return sendError(res, "Visitor name and purpose are required.", 400);
    }

    let residentIdToUse = req.user._id;
    let flatNumberToUse = req.user.flatNumber;

    if (req.user.role === "admin") {
      if (!residentId) return sendError(res, "Resident ID is required when created by admin.", 400);
      const User = require("../models/User");
      const resident = await User.findById(residentId);
      if (!resident) return sendError(res, "Resident not found.", 404);
      residentIdToUse = resident._id;
      flatNumberToUse = resident.flatNumber;
    }

    const visitor = await Visitor.create({
      name,
      phone,
      purpose,
      vehicleNumber,
      expectedDate,
      notes,
      resident: residentIdToUse,
      flatNumber: flatNumberToUse,
    });

    // Store only the compact scan payload. The UI renders the QR image.
    try {
      const qrData = JSON.stringify({ visitorId: visitor._id.toString() });
      visitor.qrCode = qrData;
      await visitor.save();
    } catch (qrError) {
      console.warn("QR generation failed:", qrError.message);
    }

    await visitor.populate("resident", "name flatNumber");

    return sendSuccess(res, "Visitor invited successfully.", visitor, 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Visitors
// Admin: all | Resident: own
// ========================
const getVisitors = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { resident: req.user._id };

    const visitors = await Visitor.find(filter)
      .populate("resident", "name flatNumber")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Visitors fetched.", visitors);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Single Visitor
// ========================
const getVisitorById = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id).populate(
      "resident",
      "name flatNumber"
    );

    if (!visitor) return sendError(res, "Visitor not found.", 404);

    if (
      req.user.role === "resident" &&
      visitor.resident._id.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    return sendSuccess(res, "Visitor fetched.", visitor);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Visitor Status (admin)
// ========================
const updateVisitorStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Expected", "Checked In", "Checked Out", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return sendError(res, `Status must be one of: ${validStatuses.join(", ")}.`, 400);
    }

    const update = { status };
    if (status === "Checked In") update.checkIn = new Date();
    if (status === "Checked Out") update.checkOut = new Date();

    const visitor = await Visitor.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).populate("resident", "name flatNumber");

    if (!visitor) return sendError(res, "Visitor not found.", 404);

    return sendSuccess(res, "Visitor status updated.", visitor);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Visitor
// ========================
const deleteVisitor = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return sendError(res, "Visitor not found.", 404);

    if (
      req.user.role !== "admin" &&
      visitor.resident.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    if (req.user.role === "resident" && visitor.status !== "Expected") {
      return sendError(res, "Only expected visitor invitations can be cancelled.", 400);
    }

    await visitor.deleteOne();
    return sendSuccess(res, "Visitor deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitorStatus,
  deleteVisitor,
};
