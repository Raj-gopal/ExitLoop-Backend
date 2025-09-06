import express from "express";
import {
  createUsageSession,
  getUsageSessions,
  deleteUsageSessions,
} from "../controllers/usageSession.controller.js";

const router = express.Router();

// ✅ Create a usage session
router.route("/:userId/createUsageSession").post(verifyJWT,  createUsageSession)

// ✅ Get all sessions by userId
router.route("/:userId/getUsageSessions").get(verifyJWT, getUsageSessions)


// ✅ Delete all sessions for a user
router.route("/:userId/deleteUsageSessions").delete(verifyJWT, deleteUsageSessions)

export default router;


