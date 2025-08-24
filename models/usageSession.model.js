import mongoose from "mongoose";

const usageSessionSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appPackageName: {
      type: String,
      required: true,
      trim: true,
    },

    sessionStart: {
      type: Number,
      required: true,
    },

    sessionEnd: {
      type: Number,
    },

    durationSeconds: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true, 
  }
);

export const UsageSession = mongoose.model("UsageSession", usageSessionSchema);
