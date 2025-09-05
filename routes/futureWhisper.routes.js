import { Router } from "express";
import {
  createFutureWhisper,
  getFutureWhispers,
  updateFutureWhisper,
  deleteFutureWhisper,
} from "../controllers/futureWhisper.controller.js";

const router = Router();

// ✅ Create whisper for a streakZone
router.post("/:streakZoneId", createFutureWhisper);

// ✅ Get all whispers for a streakZone
router.get("/:streakZoneId", getFutureWhispers);

// ✅ Update a whisper by id
router.put("/:id", updateFutureWhisper);

// ✅ Delete a whisper by id
router.delete("/:id", deleteFutureWhisper);

export default router;
