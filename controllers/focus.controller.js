import { Focus } from "../models/focus.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create or Update Focus by userId
 const createOrUpdateFocus = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params; // 👈 userId from params
    const {
      totalFocus,
      focusAlone,
      maxFocus,
      totalFocusTime,
      breakComingAt,
      breakDuration,
      joinRoomId,
      createRoomId,
      roomId,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const focus = await Focus.findOneAndUpdate(
      { userId },
      {
        totalFocus,
        focusAlone,
        maxFocus,
        totalFocusTime,
        breakComingAt,
        breakDuration,
        joinRoomId,
        createRoomId,
        roomId,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      success: true,
      data: focus,
      message: "Focus created/updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
 });

// ✅ Get Focus by userId
const getFocus = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const focus = await Focus.findOne({ userId });

    if (!focus) {
      return res.status(404).json({ success: false, message: "Focus not found for this user" });
    }

    res.status(200).json({ success: true, data: focus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Delete Focus by userId
const deleteFocus = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await Focus.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Focus not found for this user" });
    }

    res.status(200).json({ success: true, message: "Focus deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createOrUpdateFocus,
  getFocus,
  deleteFocus,
};
