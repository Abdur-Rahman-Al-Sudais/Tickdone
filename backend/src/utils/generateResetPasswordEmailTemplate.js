import { APP_NAME } from "../constants.js";

export const generateResetPasswordEmailTemplate = (resetPasswordUrl) => {
  return `<body style="margin:0; padding:0; background-color:#f5f7fb;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
    Reset your ${APP_NAME} password. This token will expire in 30 minutes
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f5f7fb; padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:24px; background:#ffffff; border-radius:14px 14px 0 0; border:1px solid #e9edf5; border-bottom:0; text-align:center;">
              <span style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; color:#111827;">
                ${APP_NAME}
              </span>
              <br />
              <span style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#6b7280;">
                Password Reset
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td align="center" style="padding:0 24px 24px 24px; background:#ffffff; border:1px solid #e9edf5; border-top:0; border-bottom:0; text-align:center;">
              <h1 style="margin:0 0 12px 0; font-family:Arial,Helvetica,sans-serif; font-size:22px; line-height:28px; color:#111827; text-align:center;">
                Reset your password
              </h1>
              <p style="margin:0 0 12px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#374151; text-align:center;">
                We received a request to reset your password for your ${APP_NAME} account.
              </p>
              <p style="margin:0 0 20px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:20px; color:#374151; text-align:center;">
                Click the button below to choose a new password.
              </p>

              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 16px auto;">
                <tr>
                  <td align="center" bgcolor="#2563EB" style="border-radius:10px;">
                    <a href="${resetPasswordUrl}" target="_blank"
                       style="display:inline-block; padding:12px 20px; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; text-decoration:none; color:#ffffff; background-color:#2563EB; border-radius:10px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Link fallback -->
              <p style="margin:0 0 8px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#6b7280; text-align:center;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>
              <p style="margin:0 0 16px 0; font-family:Consolas,Menlo,Monaco,monospace; font-size:12px; line-height:18px; color:#2563EB; word-break:break-all; text-align:center;">
                <a href="${resetPasswordUrl}" target="_blank" style="color:#2563EB; text-decoration:underline;">${resetPasswordUrl}</a>
              </p>

              <!-- Info + security -->
              <p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#6b7280; text-align:center;">
                This token will expire in 30 minutes
              </p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#6b7280; text-align:center;">
                If you didn’t request this, you can safely ignore this email. Your password won’t change.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 24px 24px 24px; background:#ffffff; border:1px solid #e9edf5; border-top:0; border-radius:0 0 14px 14px; text-align:center;">
              <p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; color:#9ca3af; text-align:center;">
                Need help? Contact us at
                <a href="mailto:sk6606024@gmail.com" style="color:#2563EB; text-decoration:underline;">sk6606024@gmail.com</a>
              </p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:16px; color:#9ca3af; text-align:center;">
                © ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
              </p>
            </td>
          </tr>

          <!-- Small print -->
          <tr>
            <td align="center" style="padding:12px; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:14px; color:#9ca3af; text-align:center;">
              You’re receiving this email because a password reset was requested for this address.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`;
};
