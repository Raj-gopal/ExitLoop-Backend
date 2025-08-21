import mongoose from "mongoose";

const timeLimitSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalTimeLimit: {
      type: [Number],
    },

    totalTimeUsed: {
      type: [Number],
    },

    peakTimeLimit: {
      type: Number,
    },

    peakTimeUsed: {
      type: [Number],
    },

    upcomingPeak: {
      type: [Number],
    },

  },
  {
    timestamps: true, 
  }
);

export const TimeLimit = mongoose.model("TimeLimit", timeLimitSchema);
