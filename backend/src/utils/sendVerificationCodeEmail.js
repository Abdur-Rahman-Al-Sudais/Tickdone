import { APP_NAME } from "../constants.js";
import { generateVerificationCodeEmailTemplate } from "./generateVerificationCodeEmailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export const sendVerificationCodeEmail = async (verificationCode, email) => {
  const message = generateVerificationCodeEmailTemplate(verificationCode);

  const emailResponse = await sendEmail({
    email,
    subject: `${APP_NAME} | Verification Code`,
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
