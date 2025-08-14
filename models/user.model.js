import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      trim: true,
      index: true,
    },

    phoneNumber: {
      type: Number,
      required: [true, "phoneNumber is required"],
      unique: true,
      trim: true,
      index: true,
    },

    importance: {
      type: String,
      enum: [ "LOW" , "MEDIUM" , "HIGH" , "VERY_HIGH" , "CRITICAL" , ], 
    },

    proUser: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
    },

    refreshToken: {
      type: String,
    },

    totalOff: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);



// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       fullName: this.fullName,
//       phoneNumber: this.phoneNumber,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };
export const User = mongoose.model("User", userSchema);
