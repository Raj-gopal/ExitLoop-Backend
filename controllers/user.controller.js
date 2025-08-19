import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken to DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
};


const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    importance,
    proUser,
    otp,
    totalOff
  } = req.body;

  // Validation
  if (!fullName || !phoneNumber) {
    throw new ApiError(400, "fullName and phoneNumber are required");
  }

  // Check if user exists
  const existedUser = await User.findOne({ phoneNumber });
  if (existedUser) {
    throw new ApiError(409, "User with this phone number already exists");
  }

  // Step 1: Create user with empty refreshToken
  const user = await User.create({
    fullName,
    phoneNumber,
    importance,
    proUser,
    otp,
    totalOff,
    refreshToken: "",
  });

  // Step 2: Generate tokens (saves refreshToken automatically)
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  // Step 3: Fetch safe user details
  const createdUser = await User.findById(user._id).select("-refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const options = { httpOnly: true, secure: true };

  // Step 4: Send response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { createdUser, accessToken, refreshToken },
        "User registered successfully"
      )
    );
});


const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  // Validation
  if (!phoneNumber) {
    throw new ApiError(400, "phoneNumber is required");
  }

  // Check if user exists
  const existedUser = await User.findOne({ phoneNumber });
  if (!existedUser) {
    throw new ApiError(409, "User with this phone number does not exist");
  }

  // Generate tokens (auto-saves refreshToken)
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(existedUser._id);

  const loggedInUser = await User.findById(existedUser._id).select("-refreshToken");

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In Successfully"
      )
    );
});


export { registerUser, loginUser };
