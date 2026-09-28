const express = require("express");
const {
  createPoll,
  getPolls,
  votePoll,
  closePoll,
  deletePoll,
} = require("../controllers/pollController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createPoll);
router.get("/", getPolls);
router.post("/:id/vote", authorize("resident"), votePoll);
router.patch("/:id/close", authorize("admin"), closePoll);
router.delete("/:id", authorize("admin"), deletePoll);

module.exports = router;
