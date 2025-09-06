import { PeakCal } from "../models/peakCal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create PeakCal
 const createPeakCal = asyncHandler(async (req, res) => {
  const { userId } = req.params; // <-- from params
  const { maxTimeToday, peakStartTime, peakEndTime, peakHours, peakStartNextWeek, peakEndNextWeek } = req.body;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const peakCal = await PeakCal.create({
    userId,
    maxTimeToday,
    peakStartTime,
    peakEndTime,
    peakHours,
    peakStartNextWeek,
    peakEndNextWeek,
  });

  return res.status(201).json(new ApiResponse(201, peakCal, "PeakCal created successfully"));
});

// Get PeakCal by userId
 const getPeakCal = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const peakCal = await PeakCal.findOne({ userId }).select("-__v");

  if (!peakCal) {
    throw new ApiError(404, "PeakCal not found for this user");
  }

  return res.status(200).json(new ApiResponse(200, peakCal, "PeakCal fetched successfully"));
});

// Update PeakCal by userId
 const updatePeakCal = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  const peakCal = await PeakCal.findOneAndUpdate(
    { userId },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!peakCal) {
    throw new ApiError(404, "PeakCal not found for this user");
  }

  return res.status(200).json(new ApiResponse(200, peakCal, "PeakCal updated successfully"));
});

// Delete PeakCal by userId
 const deletePeakCal = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const peakCal = await PeakCal.findOneAndDelete({ userId });

  if (!peakCal) {
    throw new ApiError(404, "PeakCal not found for this user");
  }

  return res.status(200).json(new ApiResponse(200, peakCal, "PeakCal deleted successfully"));
});

export { createPeakCal, getPeakCal, updatePeakCal, deletePeakCal };
