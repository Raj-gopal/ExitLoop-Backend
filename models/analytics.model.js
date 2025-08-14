import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  appName: {
    type: String,
    required: true
  },

  duration: {
    type: Number, // in minutes
    required: true
  },

  scrollCount: {
    type: Number,
    default: 0
  },

  blocked: {
    type: Boolean,
    default: false
  },

  limitSet: {
    type: Number, // optional daily scroll or time limit (in minutes)
    default: 0
  },

  unlockedAt: {
    type: Date // if this entry is for an unlock event
  },

  isPeakTime: {
    type: Boolean,
    default: false
  },

  peakHour: {
    type: String, // example: "19:00" for 7 PM
    default: null
  },

  soloAppLimitToday: {
    type: Number, // app-specific screen time limit for today (in minutes)
    default: 0
  },

  soloAppScrollLimitToday: {
    type: Number, // app-specific scroll limit for today
    default: 0
  },

  timeSaved: {
    type: Number, // in minutes, compared to limit
    default: 0
  },

  phoneUnlockCount: {
    type: Number,
    default: 0
  },

  isMostUsedToday: {
    type: Boolean,
    default: false
  },

  isMostUsedWeekly: {
    type: Boolean,
    default: false
  },

  isMostUsedMonthly: {
    type: Boolean,
    default: false
  },

  soloAppLimitYesterday: {
    type: Number,
    default: 0
  },

  soloAppLimitLastWeek: {
    type: Number,
    default: 0
  }
});

analyticsSchema.index({ user: 1, date: 1, appName: 1 });

export const Analytics = mongoose.model("Analytics", analyticsSchema);
