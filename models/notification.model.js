import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isNotification: {
      type: Boolean,
      default: true,
    },

    icon: {
      type: String,
      required: true,
      maxlength: 100,   // URL or icon name, usually short
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,   // Titles usually short but 50 is a bit restrictive
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: Number,
      required: true,   // Store as UNIX timestamp or HHMM
    },

    message: {
      type: String,
      required: true,
      maxlength: 500,   // Messages can be longer, but still limited
    },
  },
  {
    timestamps: true, 
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
