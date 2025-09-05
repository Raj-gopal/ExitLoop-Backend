import express from "express";
import {
  createUsageSession,
  getUsageSessionsByUserId,
  deleteUsageSessionsByUserId,
} from "../controllers/usageSessionController.js";

const router = express.Router();

// ✅ Create a usage session
router.post("/:userId", createUsageSession);

// ✅ Get all sessions by userId
router.get("/:userId", getUsageSessionsByUserId);

// ✅ Delete all sessions for a user
router.delete("/:userId", deleteUsageSessionsByUserId);

export default router;
