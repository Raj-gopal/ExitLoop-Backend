import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FutureWhisper } from "../models/futureWhisper.model.js";

// ✅ Create FutureWhisper
const createFutureWhisper = asyncHandler(async (req, res) => {
  const { streakZoneId } = req.params;
  const { title, date, streak, time, description } = req.body;

  if (!streakZoneId) {
    throw new ApiError(400, "streakZoneId is required");
  }

  const futureWhisper = await FutureWhisper.create({
    streakZoneId,
    title,
    date,
    streak,
    time,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, futureWhisper, "Future whisper created successfully"));
});

// ✅ Get all FutureWhispers for a streakZone
const getFutureWhispers = asyncHandler(async (req, res) => {
  const { streakZoneId } = req.params;

  if (!streakZoneId) {
    throw new ApiError(400, "streakZoneId is required");
  }

  const whispers = await FutureWhisper.find({ streakZoneId }).select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, whispers, "Future whispers fetched successfully"));
});

// ✅ Update FutureWhisper by ID
const updateFutureWhisper = asyncHandler(async (req, res) => {
  const { id } = req.params; // whisper id
  const updates = req.body;

  const updatedWhisper = await FutureWhisper.findByIdAndUpdate(id, updates, {
    new: true,
  }).select("-__v");

  if (!updatedWhisper) {
    throw new ApiError(404, "Future whisper not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedWhisper, "Future whisper updated successfully"));
});

// ✅ Delete FutureWhisper by ID
const deleteFutureWhisper = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedWhisper = await FutureWhisper.findByIdAndDelete(id).select("-__v");

  if (!deletedWhisper) {
    throw new ApiError(404, "Future whisper not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedWhisper, "Future whisper deleted successfully"));
});

export {
  createFutureWhisper,
  getFutureWhispers,
  updateFutureWhisper,
  deleteFutureWhisper,
};
