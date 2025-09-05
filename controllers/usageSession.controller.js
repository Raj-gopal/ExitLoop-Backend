import { UsageSession } from "../models/usageSession.model.js";

// ✅ Create a new usage session
export const createUsageSession = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get all usage sessions by userId
export const getUsageSessionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const sessions = await UsageSession.find({ userId }).sort({ createdAt: -1 });

    if (!sessions.length) {
      return res.status(404).json({ success: false, message: "No sessions found for this user" });
    }

    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete all sessions by userId
export const deleteUsageSessionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await UsageSession.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No sessions found to delete" });
    }

    res.status(200).json({ success: true, message: "All sessions deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
