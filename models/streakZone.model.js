import mongoose from "mongoose";

const streakZoneSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    currentStreak: {
      type: Number,
    },

    longestStreak: {
      type: Number,
    },

  },
  {
    timestamps: true, 
  }
);

export const StreakZone = mongoose.model("StreakZone", streakZoneSchema);
