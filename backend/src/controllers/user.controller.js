import jwt from "jsonwebtoken";
import { frontendUrl, refreshTokenSecret } from "../config/config.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";
import { sendVerificationCodeEmail } from "../utils/sendVerificationCodeEmail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUserByUsername = await User.findOne({
    username,
    isVerified: true,
  });

  if (existingUserByUsername) {
    throw new ApiError(400, "Username is already taken");
  }

  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByEmail?.isVerified) {
    throw new ApiError(400, "User already exists with this email");
  }

  const allUserEntries = await User.find({ email, isVerified: false });

  if (allUserEntries.length >= 3) {
    throw new ApiError(
      429,
      "You have exceedd the maximum number of requests (3). Please try again after an hour"
    );
  }

  const createdUser = await User.create({
    username,
    email,
    password,
  });

  const verificationCode = createdUser.generateVerificationCode();

  await createdUser.save();

  const verificationEmailResponse = await sendVerificationCodeEmail(
    verificationCode,
    email
  );

  if (!verificationEmailResponse.success) {
    throw new ApiError(500, verificationEmailResponse.message);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Verification email has been sended. Please verify your email",
        createdUser
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const foundUser = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");

  if (!foundUser) {
    throw new ApiError(400, "Invalid credentials");
  }

  if (!foundUser.isVerified) {
    throw new ApiError(400, "Please verify your account first");
  }

  const isPasswordCorrect = await foundUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = foundUser.generateAccessToken();
  const refreshToken = foundUser.generateRefreshToken();

  foundUser.refreshToken = refreshToken;

  await foundUser.save();

  // set cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, "User logged in successfully", foundUser));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { username, verificationCode } = req.params;

  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  if (!verificationCode) {
    throw new ApiError(400, "Verification code is required");
  }

  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    throw new ApiError(400, "User is not registered");
  }

  const verifiedUser = await User.findOne({ username, isVerified: true });

  if (verifiedUser) {
    throw new ApiError(400, "User is already verified");
  }

  const allUserEntries = await User.find({ username, isVerified: false }).sort({
    createdAt: -1,
  });

  if (!allUserEntries) {
    throw new ApiError(404, "User not registered");
  }

  let user;

  if (allUserEntries.length > 1) {
    user = allUserEntries[0];
    await User.deleteMany({
      _id: { $ne: user._id },
      username,
      isVerified: false,
    });
  } else {
    user = allUserEntries[0];
  }

  const userVerificationCode = user.verificationCode;

  if (userVerificationCode !== verificationCode) {
    throw new ApiError(400, "Invalid verification code");
  }

  const isCodeExpired = user.verificationCodeExpiry < new Date(Date.now());

  if (isCodeExpired) {
    throw new ApiError(400, "Your verification code has been expired");
  }
  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();

  user.isVerified = true;
  user.verificationCode = undefined;
  user.refreshToken = refreshToken;

  await user.save();

  return res
    .status(200)
    .cookie("refreshToken", refreshToken)
    .cookie("accessToken", accessToken)
    .json(new ApiResponse(200, "User has been verified successfully", user));
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = await req.user._id;

  // remove refresh token from user in db
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  // clear cookies
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "User logout successfully", null));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new ApiError(404, "User not found with this email");
  }

  const resetPasswordToken = foundUser.generateResetPasswordToken();

  await foundUser.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${frontendUrl}/auth/password/reset/${resetPasswordToken}`;

  const verificationEmailResponse = await sendResetPasswordEmail(
    resetPasswordUrl,
    email
  );

  if (!verificationEmailResponse.success) {
    throw new ApiError(500, verificationEmailResponse.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, `An email has been sended to ${email}`, null));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }
  const { resetPasswordToken } = req.params;

  if (!resetPasswordToken) {
    throw new ApiError(400, "Reset password token is required");
  }

  const foundUser = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiry: {
      $gt: new Date(),
    },
  });

  if (!foundUser) {
    throw new ApiError(
      400,
      "Reset password token is invalid or already used. Try sending email again"
    );
  }

  foundUser.password = newPassword;
  foundUser.resetPasswordToken = undefined;
  foundUser.resetPasswordTokenExpiry = undefined;

  const accessToken = foundUser.generateAccessToken();
  const refreshToken = foundUser.generateRefreshToken();

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, "User password change successfully", foundUser));
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;

  return res
    .status(200)
    .json(new ApiResponse(200, "User retrieved successfully", user));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken = req.cookies.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(400, "Not authenticated");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(incommingRefreshToken, refreshTokenSecret);
  } catch (error) {
    throw new ApiError(400, "Refresh token is expired");
  }

  const userId = decodedToken?.id;

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    throw new ApiError(404, "User not found");
  }

  if (foundUser.refreshToken !== incommingRefreshToken) {
    throw new ApiError(400, "Invalid refresh token");
  }

  const accessToken = foundUser.generateAccessToken();
  const refreshToken = foundUser.generateRefreshToken();

  foundUser.refreshToken = refreshToken;

  await foundUser.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, "Access token refreshed successfully", null));
});

export {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  getUser,
  refreshAccessToken,
};
