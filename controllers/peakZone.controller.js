import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PeakZone } from "../models/peakZone.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPeakZone = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { focusScore, trackingStart, trackingEnd } = req.body;

  // Validation
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  // Create PeakZone

  const peakZone = await PeakZone.findOneAndUpdate(
  { userId },
  { focusScore, trackingStart, trackingEnd },
  { new: true, upsert: true, setDefaultsOnInsert: true }
  ).select("-__v");

 // Step 3: Fetch safe peakZone details

  const createdPeakZone = await PeakZone.findById(peakZone._id).select("-__v");
  if (!createdPeakZone) {
    throw new ApiError(500, "Something went wrong while creating the peak zone");
  }

    // Step 4: Send response

  return res.status(201).json(
    new ApiResponse(201, createdPeakZone, "Peak zone created successfully")
  );
});


const getPeakZones = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }

  // Fetch all peak zones for this user
  const peakZones = await PeakZone.find({ userId }).select("-__v");

  return res.status(200).json(
    new ApiResponse(200, peakZones, "Peak zones fetched successfully")
  );
});



export { createPeakZone, getPeakZones };

