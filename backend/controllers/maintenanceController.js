const Maintenance = require("../models/Maintenance");
const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ========================
// GENERATE Bill (admin — for one or all residents)
// ========================
const generateBill = async (req, res, next) => {
  try {
    const { residentId, billMonth, amount, dueDate, notes } = req.body;

    if (!billMonth?.trim() || amount === undefined || amount === null || !dueDate) {
      return sendError(res, "Bill month, amount and due date are required.", 400);
    }

    const normalizedAmount = Number(amount);
    const normalizedBillMonth = billMonth.trim();
    if (!Number.isFinite(normalizedAmount) || normalizedAmount < 0) {
      return sendError(res, "Amount must be a valid non-negative number.", 400);
    }
    if (Number.isNaN(new Date(dueDate).getTime())) {
      return sendError(res, "Due date is invalid.", 400);
    }

    if (residentId) {
      // Generate for a single resident
      const resident = await User.findOne({ _id: residentId, role: "resident" });
      if (!resident) return sendError(res, "Resident not found.", 404);

      // Check if bill already exists for this month
      const existing = await Maintenance.findOne({ resident: residentId, billMonth: normalizedBillMonth });
      if (existing) {
        return sendError(res, `Bill for ${normalizedBillMonth} already exists for this resident.`, 409);
      }

      const bill = await Maintenance.create({
        resident: residentId,
        billMonth: normalizedBillMonth,
        amount: normalizedAmount,
        dueDate,
        notes,
        generatedBy: req.user._id,
      });

      await bill.populate("resident", "name email flatNumber");
      return sendSuccess(res, "Bill generated.", bill, 201);
    } else {
      // Generate for ALL residents
      const residents = await User.find({ role: "resident", accountStatus: "Active" });

      const bills = [];
      for (const resident of residents) {
        const existing = await Maintenance.findOne({
          resident: resident._id,
          billMonth: normalizedBillMonth,
        });
        if (!existing) {
          bills.push({
            resident: resident._id,
            billMonth: normalizedBillMonth,
            amount: normalizedAmount,
            dueDate,
            notes,
            generatedBy: req.user._id,
          });
        }
      }

      if (bills.length === 0) {
        return sendError(res, `Bills for ${normalizedBillMonth} already exist for all residents.`, 409);
      }

      await Maintenance.insertMany(bills);
      return sendSuccess(res, `${bills.length} bill(s) generated for ${normalizedBillMonth}.`, null, 201);
    }
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Bills
// Admin: all | Resident: own
// ========================
const getBills = async (req, res, next) => {
  try {
    // Keep the persisted status in sync before calculating any list or report.
    // Paid bills are deliberately excluded so a late payment remains settled.
    await Maintenance.updateMany(
      { status: "Pending", dueDate: { $lt: new Date() } },
      { $set: { status: "Overdue" } }
    );

    const filter = req.user.role === "admin" ? {} : { resident: req.user._id };

    const bills = await Maintenance.find(filter)
      .populate("resident", "name email flatNumber")
      .populate("generatedBy", "name")
      .sort({ createdAt: -1 });

    return sendSuccess(res, "Bills fetched.", bills);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET Single Bill
// ========================
const getBillById = async (req, res, next) => {
  try {
    const bill = await Maintenance.findById(req.params.id)
      .populate("resident", "name email flatNumber")
      .populate("generatedBy", "name");

    if (!bill) return sendError(res, "Bill not found.", 404);

    if (
      req.user.role === "resident" &&
      bill.resident._id.toString() !== req.user._id.toString()
    ) {
      return sendError(res, "Access denied.", 403);
    }

    return sendSuccess(res, "Bill fetched.", bill);
  } catch (error) {
    next(error);
  }
};

// ========================
// MARK Bill as PAID (resident — simulated payment)
// ========================
const payBill = async (req, res, next) => {
  try {
    const { paymentMethod, transactionId } = req.body;

    const bill = await Maintenance.findById(req.params.id);
    if (!bill) return sendError(res, "Bill not found.", 404);

    if (bill.resident.toString() !== req.user._id.toString()) {
      return sendError(res, "You can only pay your own bills.", 403);
    }

    if (bill.status === "Paid") {
      return sendError(res, "This bill has already been paid.", 400);
    }

    bill.status = "Paid";
    bill.paidAt = new Date();
    const validMethods = ["Online", "Cash", "Cheque", "UPI", "NEFT"];
    if (paymentMethod && !validMethods.includes(paymentMethod)) {
      return sendError(res, "Invalid payment method.", 400);
    }

    bill.paymentMethod = paymentMethod || "Online";
    bill.transactionId = transactionId || `TXN${Date.now()}`;
    await bill.save();

    await bill.populate("resident", "name email flatNumber");

    return sendSuccess(res, "Payment successful.", bill);
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE Bill (admin)
// ========================
const deleteBill = async (req, res, next) => {
  try {
    const bill = await Maintenance.findByIdAndDelete(req.params.id);
    if (!bill) return sendError(res, "Bill not found.", 404);
    return sendSuccess(res, "Bill deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = { generateBill, getBills, getBillById, payBill, deleteBill };
