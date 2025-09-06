import { PeakZone } from "../models/peakZone.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create or Update PeakZone (from params)
const createPeakZone = asyncHandler(async (req, res) => {
  const { userId } = req.params; // <-- params
  const { focusScore, trackingStart, trackingEnd } = req.body;

  // Validation
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  // Create or update PeakZone
  const peakZone = await PeakZone.findOneAndUpdate(
    { userId },
    { focusScore, trackingStart, trackingEnd },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

  // Fetch safe PeakZone details
  const createdPeakZone = await PeakZone.findById(peakZone._id).select("-__v");
  if (!createdPeakZone) {
    throw new ApiError(500, "Something went wrong while creating the peak zone");
  }

  // Send response
  return res
    .status(201)
    .json(new ApiResponse(201, peakZone, "Peak zone created successfully"));
});



// ✅ Get all PeakZones by userId (from params)
const getPeakZones = asyncHandler(async (req, res) => {
  const { userId } = req.params; // <-- params

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  const peakZones = await PeakZone.find({ userId }).select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, peakZones, "Peak zones fetched successfully"));
});



export { createPeakZone, getPeakZones };

