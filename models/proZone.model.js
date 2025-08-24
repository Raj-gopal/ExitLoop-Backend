import mongoose from "mongoose";

const proZoneSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    typeOfPlan: {
      type: String,
      enum: ["free", "Monthly Plan", "Quarterly Plan", "Yearly Plan"],
      required: true,
    },

    planDaysLeft: {
      type: Number,
      default: 0,  // keeps it safe if not set
    },

    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10, // ISO currency codes are short (e.g. USD, INR, EUR)
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100, // percentage-based
    },

    couponCode: {
      type: String,
      maxlength: 50,
      trim: true,
    },

    extraDiscountRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    extraDiscountDesc: {
      type: String,
      maxlength: 200,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const ProZone = mongoose.model("ProZone", proZoneSchema);
