import mongoose from "mongoose";

const appDataSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appData: [
      {
        appPackageName: {
          type: String,
          required: true,
        },
        dailyUsage: {
          type: Number,
          default: 0,
        },
        dailyLaunches: {
          type: Number,
          default: 0,
        },
        appUsed: [
          {
            type: [Number],
          },
        ],
        appPeakUsed: [
          {
            type: [Number],
          },
        ],
        weeklyUsed: [
          {
            type: [Number],
          },
        ],
        weeklyPeakUsed: [
          {
            type: [Number],
          },
        ],
        appCapped: {
          type: Boolean,
          default: false,
        },
        appLimit: {
          type: Number, // timestamp -> Date
        },
        reelScroll: {
          type: Boolean,
          default: false,
        },
        urgentUse: {
          type: Number,
          default: 0,
        },
        peakMode: {
          type: Boolean,
          default: false,
        },
        appAllowedFocus: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export const AppData = mongoose.model("AppData", appDataSchema);
