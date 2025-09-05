import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";

// ✅ Create Notification
const createNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isNotification, icon, title, date, time, message } = req.body;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const notification = await Notification.create({
    userId,
    isNotification,
    icon,
    title,
    date,
    time,
    message,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, notification, "Notification created successfully"));
});

// ✅ Get all Notifications for a user
const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

// ✅ Update Notification by ID
const updateNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedNotification = await Notification.findByIdAndUpdate(id, updates, {
    new: true,
  }).select("-__v");

  if (!updatedNotification) {
    throw new ApiError(404, "Notification not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNotification, "Notification updated successfully"));
});

// ✅ Delete Notification by ID
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedNotification = await Notification.findByIdAndDelete(id).select("-__v");

  if (!deletedNotification) {
    throw new ApiError(404, "Notification not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedNotification, "Notification deleted successfully"));
});

export {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
};
