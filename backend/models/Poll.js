const mongoose = require("mongoose");

const pollOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    options: {
      type: [pollOptionSchema],
      validate: {
        validator: (v) => v.length >= 2,
        message: "A poll must have at least 2 options.",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
