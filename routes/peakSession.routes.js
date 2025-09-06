import { Router } from "express";
import {
  createPeakSession,
  getPeakSessions,
} from "../controllers/peakSession.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// ✅ Routes
router.route("/:userId/createPeakSession").post(verifyJWT, createPeakSession);
router.route("/:userId/getPeakSessions").get(verifyJWT, getPeakSessions);


export default router;
