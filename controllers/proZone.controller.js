import { ProZone } from "../models/proZoneModel.js";

// ✅ Create or Update ProZone for a user
export const createOrUpdateProZone = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get ProZone by userId
export const getProZoneByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const proZone = await ProZone.findOne({ userId });

    if (!proZone) {
      return res.status(404).json({ success: false, message: "ProZone not found for this user" });
    }

    res.status(200).json({ success: true, data: proZone });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete ProZone by userId
export const deleteProZoneByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await ProZone.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "ProZone not found for this user" });
    }

    res.status(200).json({ success: true, message: "ProZone deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export { createOrUpdateProZone, getProZoneByUserId, deleteProZoneByUserId };
