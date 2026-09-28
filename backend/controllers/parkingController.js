const Parking = require("../models/Parking");
const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// ALLOCATE Parking Slot (admin) / REQUEST Parking (resident)
// ========================
const allocateParking = async (req, res, next) => {
  try {
    const { residentId, slotNumber, vehicleType, vehicleNumber, vehicleName } = req.body;

    if (!slotNumber || !vehicleType || !vehicleNumber) {
      return sendError(
        res,
        "Slot number, vehicle type, and vehicle number are required.",
        400
      );
    }

    const targetResidentId = req.user.role === "admin" ? residentId : req.user._id;
    if (req.user.role === "admin" && !residentId) {
      return sendError(res, "Resident ID is required when allocating parking.", 400);
    }

    const resident = await User.findOne({ _id: targetResidentId, role: "resident" });
    if (!resident) return sendError(res, "Resident not found.", 404);

    const normalizedSlotNumber = slotNumber.trim().toUpperCase();
    const normalizedVehicleNumber = vehicleNumber.trim().toUpperCase();

    const occupiedSlot = await Parking.findOne({ slotNumber: normalizedSlotNumber });
    if (occupiedSlot) {
      return sendError(res, "This parking slot is already allocated or awaiting approval.", 409);
    }

    const parking = await Parking.create({
      resident: targetResidentId,
      slotNumber: normalizedSlotNumber,
      vehicleType,
      vehicleNumber: normalizedVehicleNumber,
      vehicleName,
      allocatedBy: req.user.role === "admin" ? req.user._id : undefined,
      status: req.user.role === "admin" ? "Active" : "Pending",
    });

    await parking.populate("resident", "name email flatNumber");

    return sendSuccess(
      res,
      req.user.role === "admin" ? "Parking slot allocated." : "Parking request submitted for approval.",
      parking,
      201
    );
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Parking Slots
// Admin: all | Resident: own
// ========================
const getParkingSlots = async (req, res, next) => {
  try {
    const filter =
      req.user.role === "admin" ? {} : { resident: req.user._id };

    const slots = await Parking.find(filter)
      .populate("resident", "name email flatNumber")
      .populate("allocatedBy", "name")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Parking slots fetched.", slots);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Parking Slot (admin; resident may amend their own pending request)
// ========================
const updateParking = async (req, res, next) => {
  try {
    const { vehicleType, vehicleNumber, vehicleName, status } = req.body;
    const existing = await Parking.findById(req.params.id);
    if (!existing) return sendError(res, "Parking slot not found.", 404);

    if (req.user.role === "resident") {
      if (existing.resident.toString() !== req.user._id.toString()) {
        return sendError(res, "Access denied.", 403);
      }
      if (existing.status !== "Pending") {
        return sendError(res, "Only pending parking requests can be changed.", 400);
      }
    }

    const update = {};
    if (vehicleType !== undefined) update.vehicleType = vehicleType;
    if (vehicleNumber !== undefined) update.vehicleNumber = vehicleNumber.trim().toUpperCase();
    if (vehicleName !== undefined) update.vehicleName = vehicleName;
    if (req.user.role === "admin" && status !== undefined) update.status = status;

    const parking = await Parking.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    ).populate("resident", "name email flatNumber");

    if (!parking) return sendError(res, "Parking slot not found.", 404);

    return sendSuccess(res, "Parking slot updated.", parking);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE / RELEASE Slot (admin) or cancel a pending resident request
// ========================
const deleteParking = async (req, res, next) => {
  try {
    const parking = await Parking.findById(req.params.id);
    if (!parking) return sendError(res, "Parking slot not found.", 404);

    if (req.user.role === "resident") {
      if (parking.resident.toString() !== req.user._id.toString()) {
        return sendError(res, "Access denied.", 403);
      }
      if (parking.status !== "Pending") {
        return sendError(res, "Only pending parking requests can be cancelled.", 400);
      }
    }

    await parking.deleteOne();
    return sendSuccess(res, "Parking slot released.");
  } catch (error) {
    next(error);
  }
};

module.exports = { allocateParking, getParkingSlots, updateParking, deleteParking };
