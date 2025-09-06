import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser,
  resetPassword,
  forgotPassword,
  refreshAccessToken,
  getUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/verify-user/:username/:verificationCode", verifyUser);

router.patch("/logout", verifyJWT, logoutUser);

router.get("/get-user", verifyJWT, getUser);

router.patch("/refresh-access-token", refreshAccessToken);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:resetPasswordToken", resetPassword);

export default router;
