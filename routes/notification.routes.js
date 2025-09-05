import { Router } from "express";
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

// ✅ Create a notification for a user
router.post("/:userId", createNotification);

// ✅ Get all notifications for a user
router.get("/:userId", getNotifications);

// ✅ Update a notification by ID
router.put("/:id", updateNotification);

// ✅ Delete a notification by ID
router.delete("/:id", deleteNotification);

export default router;
