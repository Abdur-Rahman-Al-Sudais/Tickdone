import { APP_NAME } from "../constants.js";
import { generateResetPasswordEmailTemplate } from "./generateResetPasswordEmailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export const sendResetPasswordEmail = async (resetPasswordUrl, email) => {
  const message = generateResetPasswordEmailTemplate(resetPasswordUrl);

  const emailResponse = await sendEmail({
    email,
    subject: `${APP_NAME} | Reset Password`,
    message,
  });

  if (!emailResponse.success) {
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }

  return {
    success: true,
    message: "Verification email send successfully",
  };
};
