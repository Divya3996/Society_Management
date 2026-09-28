const express = require("express");
const {
  allocateParking,
  getParkingSlots,
  updateParking,
  deleteParking,
} = require("../controllers/parkingController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("resident", "admin"), allocateParking);
router.get("/", getParkingSlots);
router.put("/:id", authorize("resident", "admin"), updateParking);
router.delete("/:id", authorize("resident", "admin"), deleteParking);

module.exports = router;
