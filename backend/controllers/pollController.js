const Poll = require("../models/Poll");
const Vote = require("../models/Vote");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// CREATE Poll (admin)
// ========================
const createPoll = async (req, res, next) => {
  try {
    const { question, options, expiresAt } = req.body;

    if (!question || !options || options.length < 2) {
      return sendError(res, "Question and at least 2 options are required.", 400);
    }

    const formattedOptions = options
      .map((option) => (typeof option === "string" ? option : option?.text))
      .map((text) => (typeof text === "string" ? text.trim() : ""))
      .filter(Boolean)
      .map((text) => ({ text, votes: 0 }));

    if (formattedOptions.length < 2) {
      return sendError(res, "A poll needs at least two non-empty options.", 400);
    }

    if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
      return sendError(res, "Expiry date is invalid.", 400);
    }

    const poll = await Poll.create({
      question,
      options: formattedOptions,
      expiresAt,
      createdBy: req.user._id,
    });

    await poll.populate("createdBy", "name");

    return sendSuccess(res, "Poll created.", poll, 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET All Polls
// ========================
const getPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    // Attach hasVoted flag if resident
    if (req.user.role === "resident") {
      const votes = await Vote.find({ user: req.user._id }).select("poll");
      const votedPollIds = votes.map((v) => v.poll.toString());

      const pollsWithVote = polls.map((poll) => ({
        ...poll.toObject(),
        hasVoted: votedPollIds.includes(poll._id.toString()),
      }));

      return sendSuccess(res, "Polls fetched.", pollsWithVote);
    }

    return sendSuccess(res, "Polls fetched.", polls);
  } catch (error) {
    next(error);
  }
};

// ========================
// VOTE on Poll (resident)
// ========================
const votePoll = async (req, res, next) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) return sendError(res, "Poll not found.", 404);
    if (poll.status === "Closed") return sendError(res, "This poll is closed.", 400);
    if (poll.expiresAt && new Date() > poll.expiresAt) {
      poll.status = "Closed";
      await poll.save();
      return sendError(res, "This poll has expired.", 400);
    }
    if (optionIndex === undefined || optionIndex < 0 || optionIndex >= poll.options.length) {
      return sendError(res, "Invalid option selected.", 400);
    }

    // Check if already voted
    const existingVote = await Vote.findOne({ poll: poll._id, user: req.user._id });
    if (existingVote) {
      return sendError(res, "You have already voted on this poll.", 409);
    }

    // Record vote
    await Vote.create({ poll: poll._id, user: req.user._id, selectedOption: optionIndex });

    // Increment option vote count
    poll.options[optionIndex].votes += 1;
    await poll.save();

    return sendSuccess(res, "Vote recorded successfully.", poll);
  } catch (error) {
    next(error);
  }
};

// ========================
// CLOSE Poll (admin)
// ========================
const closePoll = async (req, res, next) => {
  try {
    const poll = await Poll.findByIdAndUpdate(
      req.params.id,
      { status: "Closed" },
      { new: true }
    );
    if (!poll) return sendError(res, "Poll not found.", 404);
    return sendSuccess(res, "Poll closed.", poll);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Poll (admin)
// ========================
const deletePoll = async (req, res, next) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) return sendError(res, "Poll not found.", 404);
    await Vote.deleteMany({ poll: req.params.id });
    return sendSuccess(res, "Poll deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = { createPoll, getPolls, votePoll, closePoll, deletePoll };
