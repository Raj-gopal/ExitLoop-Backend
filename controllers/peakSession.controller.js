import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PeakSession } from "../models/peakSession.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create or Update PeakSession (from params)
const createPeakSession = asyncHandler(async (req, res) => {
  const { userId } = req.params; // <-- params
  const { focusScore, trackingStart, trackingEnd } = req.body;

  // Validation
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  // Create or update PeakSession
  const peakSession = await PeakSession.findOneAndUpdate(
    { userId },
    { focusScore, trackingStart, trackingEnd },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  // Fetch safe PeakSession details
  const createdPeakSession = await PeakSession.findById(peakSession._id).select("-__v");
  if (!createdPeakSession) {
    throw new ApiError(500, "Something went wrong while creating the peak session");
  }

  // Send response
  return res
    .status(201)
    .json(new ApiResponse(201, peakSession, "Peak session created successfully"));
});

// ✅ Get all PeakSessions by userId (from params)
const getPeakSessions = asyncHandler(async (req, res) => {
  const { userId } = req.params; // <-- params

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const peakSessions = await PeakSession.find({ userId }).select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, peakSessions, "Peak sessions fetched successfully"));
});

export { createPeakSession, getPeakSessions };
