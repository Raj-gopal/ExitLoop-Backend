// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";


// const generateAccessAndRefereshTokens = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     // Save refreshToken to DB
//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(500, "Something went wrong while generating refresh and access token");
//   }
// };


// const createPeakZone = asyncHandler(async (req, res) => {
//   const userId = req.user.id;
//   const {
//       focusScore,
//       trackingStart,
//       trackingEnd,
//   } = req.body;

//   // Validation
//   if (!userId) {
//     throw new ApiError(400, "userId is required");
//   }

//   // Check if user exists
//   const existedUser = await User.findOne({ phoneNumber });
//   if (existedUser) {
//     throw new ApiError(409, "User with this phone number already exists");
//   }

//   // Step 1: Create user with empty refreshToken
//   const user = await User.create({
//     fullName,
//     phoneNumber,
//     importance,
//     proUser,
//     otp,
//     totalOff,
//     refreshToken: "",
//   });

//   // Step 2: Generate tokens (saves refreshToken automatically)
//   const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

//   // Step 3: Fetch safe user details
//   const createdUser = await User.findById(user._id).select("-refreshToken");
//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user");
//   }

//   const options = { httpOnly: true, secure: true };

//   // Step 4: Send response
//   return res
//     .status(201)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         { createdUser, accessToken, refreshToken },
//         "User registered successfully"
//       )
//     );
// });

