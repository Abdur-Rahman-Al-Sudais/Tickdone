import mongoose from "mongoose";
import { mongodbUri } from "../config/config.js";
import { DB_NAME } from "../constants.js";
import debug from "debug";

const dbgr = debug("mongoose:development");

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${mongodbUri}/${DB_NAME}`);
    dbgr("Connected to DB successfully");
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};
