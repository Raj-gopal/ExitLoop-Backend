import mongoose from "mongoose";

const peakSessionSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    isToday: {
      type: Boolean,
    },
  },
  {
    timestamps: true, 
  }
);

export const PeakSession = mongoose.model("PeakSession", peakSessionSchema);
