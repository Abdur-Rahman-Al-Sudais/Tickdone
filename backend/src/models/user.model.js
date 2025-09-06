import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  accessTokenExpiry,
  accessTokenSecret,
  refreshTokenExpiry,
  refreshTokenSecret,
} from "../config/config.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    verificationCode: {
      type: String,
      length: [6, "Verification Code must be 6 digits"],
    },
    verificationCodeExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000), // 30 mints
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        id: this._id,
      },
      accessTokenSecret,
      {
        expiresIn: accessTokenExpiry,
      }
    );
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign(
      {
        id: this._id,
      },
      refreshTokenSecret,
      {
        expiresIn: refreshTokenExpiry,
      }
    );
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateResetPasswordToken = function () {
  const randomData = crypto.randomBytes(10).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(randomData)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordTokenExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  return resetPasswordToken;
};

userSchema.methods.generateVerificationCode = function () {
  const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
  this.verificationCode = verificationCode;
  return verificationCode;
};

export const User = model("User", userSchema);
