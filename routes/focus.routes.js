import express from "express";
import {
  createOrUpdateFocus,
  getFocusByUserId,
  deleteFocusByUserId,
} from "../controllers/focusController.js";

const router = express.Router();

// ✅ Create or Update Focus for a user
router.post("/:userId", createOrUpdateFocus);

// ✅ Get Focus by userId
router.get("/:userId", getFocusByUserId);

// ✅ Delete Focus by userId
router.delete("/:userId", deleteFocusByUserId);

export default router;
