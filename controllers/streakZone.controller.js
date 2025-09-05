import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { StreakZone } from "../models/streakZone.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { StreakZone } from "../models/streakZone.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { User } from "../models/user.model.js"; // if you have User model



// ✅ Create or Update StreakZone
export const createStreakZone = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { currentStreak, longestStreak } = req.body;

  // Validation
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  // Optional: validate user exists
  // const user = await User.findById(userId);
  // if (!user) throw new ApiError(404, "User not found");

  const zone = await StreakZone.findOneAndUpdate(
    { userId },                                // find by userId
    { userId, currentStreak, longestStreak },  // update or create
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  if (!zone) {
    throw new ApiError(500, "Something went wrong while creating the streak zone");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, zone, "Streak Zone created/updated successfully"));
});




// ✅ Get all StreakZones of logged user

// ✅ Get single StreakZone by streakZoneId (from params)
export const getStreakZones = asyncHandler(async (req, res) => {
  const { id } = req.params; // streakZoneId

  if (!id) {
    throw new ApiError(400, "streakZoneId is required");
  }

  const streakZone = await StreakZone.findById(id).select("-__v");

  if (!streakZone) {
    throw new ApiError(404, "Streak zone not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, streakZone, "Streak zone fetched successfully"));
});




export { createStreakZone, getStreakZones };
