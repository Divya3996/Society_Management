const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
        type: String,
        enum: ["admin", "resident"],
        default: "resident",
    },

    flatNumber: {
      type: String,
      trim: true,
    },

    accountStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    notificationPreferences: {
      emailNotif: { type: Boolean, default: true },
      smsNotif: { type: Boolean, default: false },
      pushNotif: { type: Boolean, default: true },
      emergencyAlerts: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
