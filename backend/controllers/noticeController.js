const Notice = require("../models/Notice");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// CREATE Notice (admin)
// ========================
const createNotice = async (req, res, next) => {
  try {
    const { title, description, category, priority, expiresAt, isActive } = req.body;

    if (!title || !description) {
      return sendError(res, "Title and description are required.", 400);
    }

    if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
      return sendError(res, "Expiry date is invalid.", 400);
    }

    const notice = await Notice.create({
      title,
      description,
      category,
      priority,
      expiresAt,
      isActive: isActive !== undefined ? isActive : true,
      publishedBy: req.user._id,
    });

    await notice.populate("publishedBy", "name role");

    return sendSuccess(res, "Notice published.", notice, 201);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET All Notices
// ========================
const getNotices = async (req, res, next) => {
  try {
    // Administrators need to see inactive notices to manage or republish them;
    // residents only receive currently published notices.
    const filter = req.user.role === "admin"
      ? {}
      : {
          isActive: true,
          $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
        };
    const notices = await Notice.find(filter)
      .populate("publishedBy", "name role")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Notices fetched.", notices);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Single Notice
// ========================
const getNoticeById = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id).populate(
      "publishedBy",
      "name role"
    );

    if (
      !notice ||
      (req.user.role !== "admin" &&
        (!notice.isActive || (notice.expiresAt && notice.expiresAt <= new Date())))
    ) {
      return sendError(res, "Notice not found.", 404);
    }

    return sendSuccess(res, "Notice fetched.", notice);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE Notice (admin)
// ========================
const updateNotice = async (req, res, next) => {
  try {
    const { title, description, category, priority, expiresAt, isActive } = req.body;

    if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
      return sendError(res, "Expiry date is invalid.", 400);
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, description, category, priority, expiresAt, isActive },
      { new: true, runValidators: true }
    ).populate("publishedBy", "name role");

    if (!notice) return sendError(res, "Notice not found.", 404);

    return sendSuccess(res, "Notice updated.", notice);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Notice (admin — soft delete)
// ========================
const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!notice) return sendError(res, "Notice not found.", 404);

    return sendSuccess(res, "Notice deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
