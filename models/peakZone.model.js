import mongoose from "mongoose";

const peakZoneSchema = new mongoose.Schema(
  {

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    focusScore: {
      type: Number,
    },

    trackingStart: {
      type: Number,
    },

    trackingEnd: {
      type: Number,
    },


  },
  {
    timestamps: true, 
  }
);

export const peakZone = mongoose.model("peakZone", peakZoneSchema);
