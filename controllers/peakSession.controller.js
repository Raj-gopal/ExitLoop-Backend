import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PeakZone } from "../models/peakSession.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Create or Update a PeakSession for a user
const createPeakZone = asyncHandler(async (req, res) => {
  const { userId } = req.params;   // <-- from params
  const { startTime, endTime, isToday } = req.body;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const peakSession = await PeakSession.findOneAndUpdate(
    { userId },
    { startTime, endTime, isToday },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  if (!peakSession) {
    throw new ApiError(500, "Something went wrong while creating the peak session");
  }

  return res.status(201).json(
    new ApiResponse(201, peakSession, "Peak session created successfully")
  );
});


// Get all PeakSessions for a user
const getPeakSessions = asyncHandler(async (req, res) => {
  const { userId } = req.params;   // <-- from params

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const peakSessions = await PeakSession.find({ userId }).select("-__v");

  return res.status(200).json(
    new ApiResponse(200, peakSessions, "Peak sessions fetched successfully")
  );
});



export { createPeakZone, getPeakSessions };

