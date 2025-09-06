import { UsageSession } from "../models/usageSession.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create a new usage session
 const createUsageSession = asyncHandler(async (req, res) => {
  const { userId } = req.params; // 👈 userId from params
  const { appPackageName, sessionStart, sessionEnd, durationSeconds } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const newSession = await UsageSession.create({
      userId,
      appPackageName,
      sessionStart,
      sessionEnd,
      durationSeconds,
    });

    res.status(201).json({
      success: true,
      data: newSession,
      message: "Usage session created successfully",
    });
  
});

// ✅ Get all usage sessions by userId
 const getUsageSessions = asyncHandler(async (req, res) => {
  const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const sessions = await UsageSession.find({ userId }).sort({ createdAt: -1 });

    if (!sessions.length) {
      return res.status(404).json({ success: false, message: "No sessions found for this user" });
    }

    res.status(200).json({ success: true, data: sessions });
  
});

// ✅ Delete all sessions by userId
 const deleteUsageSessions = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const result = await UsageSession.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No sessions found to delete" });
    }

    res.status(200).json({ success: true, message: "All sessions deleted successfully" });
  
});

export { createUsageSession, getUsageSessions, deleteUsageSessions };

