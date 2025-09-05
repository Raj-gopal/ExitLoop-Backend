// routes/streakZone.routes.js
import { Router } from "express";
import {
  createStreakZone,
  getStreakZones,
} from "../controllers/streakZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Apply auth middleware to all routes
router.use(verifyJWT);

// ✅ Create or Update StreakZone for a user
router.post("/:userId", createStreakZone);

// ✅ Get StreakZone by streakZoneId
router.get("/:id", getStreakZones);

export default router;
