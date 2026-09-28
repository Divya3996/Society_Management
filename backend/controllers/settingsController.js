const SocietySettings = require("../models/SocietySettings");
const { sendError, sendSuccess } = require("../utils/responseHandler");

const defaults = {
  name: "Digital Society Management",
  phone: "",
  email: "",
  address: "",
  registrationNumber: "",
};

const getSettings = async (req, res, next) => {
  try {
    const settings = await SocietySettings.findOneAndUpdate(
      { key: "default" },
      { $setOnInsert: { key: "default", ...defaults } },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    return sendSuccess(res, "Society settings fetched.", settings);
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { name, phone, email, address, registrationNumber } = req.body;
    if (!name?.trim()) return sendError(res, "Society name is required.", 400);
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return sendError(res, "Please provide a valid email address.", 400);
    }

    const settings = await SocietySettings.findOneAndUpdate(
      { key: "default" },
      {
        $set: {
          name: name.trim(),
          phone: String(phone || "").trim(),
          email: String(email || "").trim(),
          address: String(address || "").trim(),
          registrationNumber: String(registrationNumber || "").trim(),
        },
        $setOnInsert: { key: "default" },
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    return sendSuccess(res, "Society settings updated.", settings);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings };
