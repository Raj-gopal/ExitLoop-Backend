import { Router } from "express";
import {
  createPeakSession,
  getPeakSessions,
} from "../controllers/peakSession.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// ✅ Routes
router.route("/:userId/createPeakSession").post(createPeakSession);
router.route("/:userId/getPeakSessions").get(getPeakSessions);

export default router;
