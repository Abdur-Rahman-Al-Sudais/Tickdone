import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { accessTokenSecret } from "../config/config.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Not authenticated");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(accessToken, accessTokenSecret);
  } catch (error) {
    throw new ApiError(401, "Access token is expired");
  }

  if (!decodedToken.id) {
    throw new ApiError(400, "Invalid access token");
  }

  const userId = decodedToken.id;

  const foundUser = await User.findById(userId);

  req.user = foundUser;

  next();
});
