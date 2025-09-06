import { APP_NAME } from "../constants.js";

export const generateVerificationCodeEmailTemplate = (code) => {
  return `  <div style="max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0px 4px 12px rgba(0,0,0,0.1); text-align: center;">
    <h1 style="font-size: 22px; color: #333333; margin-bottom: 20px;">Email Verification</h1>
    <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Use the following verification code to complete your verification:</p>
    <div style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #f0f4ff; color: #2d4dfc; padding: 12px 24px; border-radius: 8px; margin: 20px 0;">
      ${code}
    </div>
    <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">This code will expire in <strong>30 minutes</strong>. If you did not request this, please ignore this email.</p>
    <div style="font-size: 12px; color: #888888; margin-top: 30px;">
      &copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
    </div>
  </div>`;
};
