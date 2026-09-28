const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slotNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ["Car", "Bike", "Scooter", "Other"],
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    vehicleName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Released"],
      default: "Active",
    },
    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
