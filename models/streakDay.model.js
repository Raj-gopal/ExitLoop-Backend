import mongoose from "mongoose";

const streakDaySchema = new mongoose.Schema(
  {

    streakZoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StreakZone",
      required: true,
    },

    date: {
      type: [Date],
    },

    streak: {
      type: Boolean,
    },

  },
  {
    timestamps: true, 
  }
);

export const StreakDay = mongoose.model("StreakDay", streakDaySchema);
