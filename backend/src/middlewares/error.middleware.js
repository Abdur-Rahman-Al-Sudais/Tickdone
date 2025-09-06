import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ApiError(400, message);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ApiError(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `JWT token is invalid, Try again.`;
    err = new ApiError(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JWT token is expired, Try again.`;
    err = new ApiError(400, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ApiError(400, message);
  }

  return res
    .status(err.statusCode)
    .json({ statusCode: err.statusCode, message: err.message, success: false });
};
