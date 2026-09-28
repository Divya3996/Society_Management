const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Maintenance = require("../models/Maintenance");
const Visitor = require("../models/Visitor");
const Parking = require("../models/Parking");
const Notice = require("../models/Notice");
const Poll = require("../models/Poll");
const Staff = require("../models/Staff");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// ADMIN Dashboard Stats
// ========================
const getAdminDashboard = async (req, res, next) => {
  try {
    const [
      totalResidents,
      activeResidents,
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      totalMaintenance,
      paidBills,
      totalVisitors,
      todayVisitors,
      activeParking,
      activeNotices,
      activePolls,
      totalStaff,
      recentComplaints,
      recentVisitors,
      latestNotices,
    ] = await Promise.all([
      User.countDocuments({ role: "resident" }),
      User.countDocuments({ role: "resident", accountStatus: "Active" }),
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: "Pending" }),
      Complaint.countDocuments({ status: "In Progress" }),
      Maintenance.countDocuments(),
      Maintenance.countDocuments({ status: "Paid" }),
      Visitor.countDocuments(),
      Visitor.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }),
      Parking.countDocuments({ status: "Active" }),
      Notice.countDocuments({
        isActive: true,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
      }),
      Poll.countDocuments({ status: "Active" }),
      Staff.countDocuments({ status: "Active" }),
      Complaint.find()
        .populate("resident", "name flatNumber")
        .sort({ createdAt: -1 })
        .limit(5),
      Visitor.find()
        .populate("resident", "name flatNumber")
        .sort({ createdAt: -1 })
        .limit(5),
      Notice.find({
        isActive: true,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
      })
        .populate("publishedBy", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    // Maintenance collection rate
    const collectionRate =
      totalMaintenance > 0
        ? Math.round((paidBills / totalMaintenance) * 100)
        : 0;

    return sendSuccess(res, "Admin dashboard data fetched.", {
      stats: {
        totalResidents,
        activeResidents,
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints: totalComplaints - pendingComplaints - inProgressComplaints,
        totalVisitors,
        todayVisitors,
        activeParking,
        activeNotices,
        activePolls,
        totalStaff,
        totalBills: totalMaintenance,
        paidBills,
        collectionRate,
      },
      recentComplaints,
      recentVisitors,
      latestNotices,
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// RESIDENT Dashboard Stats
// ========================
const getResidentDashboard = async (req, res, next) => {
  try {
    const residentId = req.user._id;

    const [
      myVisitors,
      todayVisitors,
      pendingBills,
      myComplaints,
      myParking,
      recentNotices,
      activePolls,
      recentVisitors,
    ] = await Promise.all([
      Visitor.countDocuments({ resident: residentId }),
      Visitor.countDocuments({
        resident: residentId,
        status: "Expected",
        expectedDate: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
      Maintenance.find({ resident: residentId, status: { $in: ["Pending", "Overdue"] } })
        .sort({ dueDate: 1 }),
      Complaint.countDocuments({ resident: residentId }),
      Parking.findOne({ resident: residentId, status: "Active" }),
      Notice.find({
        isActive: true,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
      })
        .populate("publishedBy", "name")
        .sort({ createdAt: -1 })
        .limit(5),
      Poll.countDocuments({ status: "Active" }),
      Visitor.find({ resident: residentId })
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const pendingAmount = pendingBills.reduce((sum, b) => sum + b.amount, 0);
    const nextDueBill = pendingBills[0] || null;

    return sendSuccess(res, "Resident dashboard data fetched.", {
      stats: {
        myVisitors,
        todayVisitors,
        pendingBillsCount: pendingBills.length,
        pendingAmount,
        myComplaints,
        parkingSlot: myParking ? myParking.slotNumber : null,
        activePolls,
      },
      nextDueBill,
      recentNotices,
      recentVisitors,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminDashboard, getResidentDashboard };
