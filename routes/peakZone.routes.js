import { Router } from "express";
import {
  createPeakZone,
  getPeakZones,
} from "../controllers/peakZone.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// ✅ Routes
router.route("/:userId/createPeakZone").post(verifyJWT, createPeakZone);
router.route("/:userId/getPeakZones").get(verifyJWT, getPeakZones);

export default router;
