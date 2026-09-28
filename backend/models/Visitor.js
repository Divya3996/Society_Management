const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ["Guest", "Delivery", "Service", "Relative", "Official", "Other"],
    },
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flatNumber: {
      type: String,
      trim: true,
    },
    vehicleNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },
    expectedDate: {
      type: Date,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Expected", "Checked In", "Checked Out", "Cancelled"],
      default: "Expected",
    },
    qrCode: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
