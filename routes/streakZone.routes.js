// routes/streakZone.routes.js
import { Router } from "express";
import {
  createStreakZone,
  getStreakZones,
} from "../controllers/streakZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Apply auth middleware to all routes

// ✅ Create or Update StreakZone for a user
router.route("/:userId/createStreakZone").post(verifyJWT,  createStreakZone);


// ✅ Get StreakZone by userId
router.route("/:userId/getStreakZone").get(verifyJWT, getStreakZones);

export default router;
