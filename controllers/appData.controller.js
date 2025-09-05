import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AppData } from "../models/appData.model.js";


// ✅ Create or Update all AppData for a user
const createOrUpdateAppData = asyncHandler(async (req, res) => {
  const { userId } = req.params; // params se userId
  const { appData } = req.body;

  if (!userId) throw new ApiError(400, "userId is required");
  if (!appData || !Array.isArray(appData)) {
    throw new ApiError(400, "appData must be a valid array");
  }

  const updatedAppData = await AppData.findOneAndUpdate(
    { userId },
    { appData },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  if (!updatedAppData) {
    throw new ApiError(500, "Something went wrong while creating/updating app data");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedAppData, "App data created/updated successfully"));
});


// ✅ Get all AppData for a user
const getAppData = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new ApiError(400, "userId is required");

  const appData = await AppData.findOne({ userId }).select("-__v");

  if (!appData) {
    throw new ApiError(404, "No app data found for this user");
  }

  return res.status(200).json(new ApiResponse(200, appData, "App data fetched successfully"));
});

// ✅ Update specific app entry
const updateAppEntry = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { appPackageName, updates } = req.body; // updates = { dailyUsage: 100, appCapped: true }

  if (!userId) throw new ApiError(400, "userId is required");
  if (!appPackageName) throw new ApiError(400, "appPackageName is required");

  // update only provided fields in the matched app
  const updateFields = {};
  for (const key in updates) {
    updateFields[`appData.$.${key}`] = updates[key];
  }

  const updatedAppData = await AppData.findOneAndUpdate(
    { userId, "appData.appPackageName": appPackageName },
    { $set: updateFields },
    { new: true }
  ).select("-__v");

  if (!updatedAppData) {
    throw new ApiError(404, `App entry with package ${appPackageName} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, updatedAppData, `App entry ${appPackageName} updated successfully`)
  );
});

// ✅ Delete/reset a specific app entry
const deleteAppEntry = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { appPackageName } = req.body;

  if (!userId) throw new ApiError(400, "userId is required");
  if (!appPackageName) throw new ApiError(400, "appPackageName is required");

  const updatedAppData = await AppData.findOneAndUpdate(
    { userId },
    { $pull: { appData: { appPackageName } } },
    { new: true }
  ).select("-__v");

  if (!updatedAppData) {
    throw new ApiError(404, `App entry with package ${appPackageName} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, updatedAppData, `App entry ${appPackageName} deleted successfully`)
  );
});



export { createOrUpdateAppData, getAppData, updateAppEntry, deleteAppEntry };
