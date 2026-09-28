const express = require("express");
const {
  generateBill,
  getBills,
  getBillById,
  payBill,
  deleteBill,
} = require("../controllers/maintenanceController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/generate", authorize("admin"), generateBill);
router.get("/", getBills);
router.get("/:id", getBillById);
router.patch("/:id/pay", authorize("resident"), payBill);
router.delete("/:id", authorize("admin"), deleteBill);

module.exports = router;
