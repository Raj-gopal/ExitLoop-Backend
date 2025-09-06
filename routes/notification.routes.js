import { Router } from "express";
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(verifyJWT);

// ✅ Create a notification for a user
router.route("/:userId/createNotification").post(verifyJWT, createNotification);


// ✅ Get all notifications for a user
router.route("/:userId/getNotifications").get(verifyJWT, getNotifications);

// ✅ Update a notification by ID
router.route("/:id/updateNotification").put(verifyJWT, updateNotification);

// ✅ Delete a notification by ID
router.route("/:id/deleteNotification").delete(verifyJWT, deleteNotification);

export default router;
