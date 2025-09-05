import express from "express";
import {
  createPeakCal,
  getPeakCalByUserId,
  updatePeakCalByUserId,
  deletePeakCalByUserId,
} from "../controllers/peakCal.controller.js";

const router = express.Router();

// Create (userId in params)
router.post("/:userId", createPeakCal);

// Get by userId
router.get("/:userId", getPeakCalByUserId);

// Update by userId
router.put("/:userId", updatePeakCalByUserId);

// Delete by userId
router.delete("/:userId", deletePeakCalByUserId);

export default router;