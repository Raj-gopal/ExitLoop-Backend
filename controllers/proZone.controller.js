import { ProZone } from "../models/proZone.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create or Update ProZone for a user
const createOrUpdateProZone = asyncHandler(async (req, res) => {
  const { userId } = req.params; // 👈 userId from params
    const {
      typeOfPlan,
      planDaysLeft,
      country,
      currency,
      price,
      discount,
      couponCode,
      extraDiscountRate,
      extraDiscountDesc,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    // Create or Update in one go
    const proZone = await ProZone.findOneAndUpdate(
      { userId },
      {
        typeOfPlan,
        planDaysLeft,
        country,
        currency,
        price,
        discount,
        couponCode,
        extraDiscountRate,
        extraDiscountDesc,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ success: true, data: proZone, message: "ProZone saved successfully" });
  
});

// ✅ Get ProZone by userId
const getProZone = asyncHandler(async (req, res) => {
  const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const proZone = await ProZone.findOne({ userId });

    if (!proZone) {
      return res.status(404).json({ success: false, message: "ProZone not found for this user" });
    }

    res.status(200).json({ success: true, data: proZone });
  
});

// ✅ Delete ProZone by userId
const deleteProZone = asyncHandler(async (req, res) => {
  const { userId } = req.params;

    const deleted = await ProZone.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "ProZone not found for this user" });
    }

    res.status(200).json({ success: true, message: "ProZone deleted successfully" });
  
});


export { createOrUpdateProZone, getProZone, deleteProZone };
