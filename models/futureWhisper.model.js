import mongoose from "mongoose";

const futureWhisperSchema = new mongoose.Schema(
  {
    streakZoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StreakZone",
      required: true,
    },

    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100, // Keep titles short & meaningful
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    streak: {
      type: Boolean,
      default: false,
    },

    time: {
      type: Number,
      required: true, // could be UNIX timestamp or HHMM
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000, // Enough space for meaningful notes
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const FutureWhisper = mongoose.model("FutureWhisper", futureWhisperSchema);
