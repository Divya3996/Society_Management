const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billMonth: {
      type: String,
      required: true,
      trim: true,
      // e.g. "Aug 2026"
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    paidAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Cash", "Cheque", "UPI", "NEFT"],
      trim: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

maintenanceSchema.index({ resident: 1, billMonth: 1 }, { unique: true });

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);
module.exports = Maintenance;
