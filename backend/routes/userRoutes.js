const express = require("express");
const {
  getAllResidents,
  getUserById,
  createResident,
  updateUser,
  toggleStatus,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("admin")); // All user management is admin-only

router.get("/", getAllResidents);
router.post("/", createResident);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.patch("/:id/status", toggleStatus);
router.delete("/:id", deleteUser);

module.exports = router;
