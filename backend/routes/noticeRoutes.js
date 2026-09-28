const express = require("express");
const {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createNotice);
router.get("/", getNotices);
router.get("/:id", getNoticeById);
router.put("/:id", authorize("admin"), updateNotice);
router.delete("/:id", authorize("admin"), deleteNotice);

module.exports = router;
