import nodemailer from "nodemailer";
import { gmailPass, gmailUser } from "../config/config.js";
import { APP_NAME } from "../constants.js";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `${APP_NAME} <${gmailUser}>`,
      to: email,
      subject: subject,
      html: message,
    });

    return {
      success: true,
      message: "Email send successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
    };
  }
};
