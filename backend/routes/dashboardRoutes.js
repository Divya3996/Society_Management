const express = require("express");
const {
  getAdminDashboard,
  getResidentDashboard,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.get("/admin", authorize("admin"), getAdminDashboard);
router.get("/resident", authorize("resident"), getResidentDashboard);

module.exports = router;
