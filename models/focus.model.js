import mongoose from "mongoose";

const focusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalFocus: {
      type: [Number],
      default: [0],  // keeps it safe if not set
    },

    focusAlone: {
      type: [Number],
      default: [0],  // keeps it safe if not set
    },

    maxFocus: {
      type: Number,
      default: 0,  // keeps it safe if not set
    },

    totalFocusTime: {
      type: Number,
      default: 0,  // keeps it safe if not set
    },

    breakComingAt: {
      type: Number,
      default: null,
    },

    breakDuration: {
      type: Number,
      default: null,
    },

    joinRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    createRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export const Focus = mongoose.model("Focus", focusSchema);
