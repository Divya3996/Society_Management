const express = require("express");
const {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitorStatus,
  deleteVisitor,
} = require("../controllers/visitorController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("resident", "admin"), createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitorById);
router.patch("/:id/status", authorize("admin"), updateVisitorStatus);
router.delete("/:id", deleteVisitor);

module.exports = router;
