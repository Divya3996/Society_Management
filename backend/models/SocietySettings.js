const mongoose = require("mongoose");

// A single document stores society-wide details. The fixed key prevents the
// accidental creation of one settings record per administrator.
const societySettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true, immutable: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    address: { type: String, trim: true, maxlength: 500 },
    registrationNumber: { type: String, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocietySettings", societySettingsSchema);
