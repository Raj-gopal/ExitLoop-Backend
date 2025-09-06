import { StreakZone } from "../models/streakZone.model.js";
import { StreakDay } from "../models/streakDay.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create StreakDay under a StreakZone
 const createStreakDay = asyncHandler(async (req, res) => {
  const { streakZoneId } = req.params;
  const { date, streak } = req.body;

  const zone = await StreakZone.findById(streakZoneId);
  if (!zone) throw new ApiError(404, "Streak Zone not found");

  const streakDay = await StreakDay.create({
    streakZoneId,
    date,
    streak,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, streakDay, "Streak Day created successfully"));
});

// ✅ Get all StreakDays under a StreakZone
 const getStreakDays = asyncHandler(async (req, res) => {
  const { streakZoneId } = req.params;

  const zone = await StreakZone.findById(streakZoneId);
  if (!zone) throw new ApiError(404, "Streak Zone not found");

  const streakDays = await StreakDay.find({ streakZoneId });

  return res
    .status(200)
    .json(new ApiResponse(200, streakDays, "Streak Days fetched successfully"));
});


export { createStreakDay, getStreakDays };

