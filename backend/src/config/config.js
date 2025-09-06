import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongodbUri = process.env.MONGODB_URI;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
const corsOrigin = process.env.CORS_ORIGIN;
const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;
const frontendUrl = process.env.FRONTEND_URL;

export {
  port,
  mongodbUri,
  accessTokenSecret,
  accessTokenExpiry,
  refreshTokenSecret,
  refreshTokenExpiry,
  corsOrigin,
  gmailUser,
  gmailPass,
  frontendUrl,
};
