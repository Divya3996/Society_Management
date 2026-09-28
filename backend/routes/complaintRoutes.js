const express = require("express");
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect); // All complaint routes require auth

router.post("/", authorize("resident", "admin"), createComplaint);
router.get("/", getComplaints);
router.get("/:id", getComplaintById);
router.put("/:id", updateComplaint);
router.patch("/:id/status", authorize("admin"), updateComplaintStatus);
router.delete("/:id", deleteComplaint);

module.exports = router;

