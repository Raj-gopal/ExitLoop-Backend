import { Router } from "express";
import {
  createFutureWhisper,
  getFutureWhispers,
  updateFutureWhisper,
  deleteFutureWhisper,
} from "../controllers/futureWhisper.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(verifyJWT);

const router = Router();



// ✅ Create whisper for a streakZone
router.route("/:streakZoneId/createFutureWhisper").post(verifyJWT, createFutureWhisper);


// ✅ Get all whispers for a streakZone
router.route("/:streakZoneId/getFutureWhispers").get(verifyJWT, getFutureWhispers);

// ✅ Update a whisper by id
router.route("/:id/updateFutureWhisper").put(verifyJWT, updateFutureWhisper);

// ✅ Delete a whisper by id
router.route("/:id/deleteFutureWhisper").delete(verifyJWT, deleteFutureWhisper);

export default router
