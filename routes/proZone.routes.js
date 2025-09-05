import express from "express";
import {
  createOrUpdateProZone,
  getProZoneByUserId,
  deleteProZoneByUserId,
} from "../controllers/proZoneController.js";

const router = express.Router();

// ✅ Create or Update ProZone for a user
router.post("/:userId", createOrUpdateProZone);

// ✅ Get ProZone by userId
router.get("/:userId", getProZoneByUserId);

// ✅ Delete ProZone by userId
router.delete("/:userId", deleteProZoneByUserId);

export default router;
