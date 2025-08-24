import mongoose from "mongoose";

const peakCalSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    maxTimeToday: {
      type: Number,
    },

    peakStartTime: {
      type: Number,
    },

    peakEndTime: {
      type: Number,
    },

    peakHours: {
      type: [Number],
    },

    peakStartNextWeek: {
        type: Number,
    },

    peakEndNextWeek: {
        type: Number,
    }

  },
  {
    timestamps: true, 
  }
);

export const PeakCal = mongoose.model("PeakCal", peakCalSchema);
