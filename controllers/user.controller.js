import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({})

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

  const {
    fullName,
    phoneNumber,
    importance,
    proUser,
    otp,
    totalOff
  } = req.body;

  // Validation: required fields from schema
  if (!fullName || !phoneNumber) {
    throw new ApiError(400, "fullName and phoneNumber are required");
  }

  // Check if user already exists by phoneNumber
  const existedUser = await User.findOne({ phoneNumber });

  if (existedUser) {
    throw new ApiError(409, "User with this phone number already exists");
  }

  // Create user (refreshToken blank at start)
  const user = await User.create({
    fullName,
    phoneNumber,
    importance,
    proUser,
    otp,
    totalOff,
    refreshToken: ""
  });

  // Fetch without sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});




const loginUser = asyncHandler(async (req, res) => {

  const {

    phoneNumber,
  } = req.body;

   // Validation: required fields from schema
  if (!phoneNumber) {
    throw new ApiError(400, "phoneNumber is required");
  }

    // Check if user already exists by phoneNumber
  const existedUser = await User.findOne({ phoneNumber });

  if (!existedUser) {
    throw new ApiError(409, "User with this phone number does not exist");
  }

  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(existedUser._id)

  const loggedInUser = await User.findById(existedUser._id).select(" -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )


});


export {
    registerUser,
    loginUser,

}