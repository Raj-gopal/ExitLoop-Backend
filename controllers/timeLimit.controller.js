import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TimeLimit } from "../models/timeLimit.model.js";

// ✅ Create or Update TimeLimit by userId (from params)
const createTimeLimit = asyncHandler(async (req, res) => {
  const { userId } = req.params;   // <-- from params
  const { totalTimeLimit, totalTimeUsed, peakTimeLimit, peakTimeUsed, upcomingPeak } = req.body;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const timeLimit = await TimeLimit.findOneAndUpdate(
    { userId },
    { totalTimeLimit, totalTimeUsed, peakTimeLimit, peakTimeUsed, upcomingPeak },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  if (!timeLimit) {
    throw new ApiError(500, "Something went wrong while creating the time limit");
  }

  return res.status(201).json(
    new ApiResponse(201, timeLimit, "Time limit created successfully")
  );
});

// ✅ Get all TimeLimits by userId (from params)
const getTimeLimits = asyncHandler(async (req, res) => {
  const { userId } = req.params;   // <-- from params

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const timeLimits = await TimeLimit.find({ userId }).select("-__v");

  return res.status(200).json(
    new ApiResponse(200, timeLimits, "Time limits fetched successfully")
  );
});


export { createTimeLimit, getTimeLimits };

