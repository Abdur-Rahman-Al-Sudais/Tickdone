import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be atleast 8 characters")
      .max(25, "New password must be no more than 25 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be atleast 8 characters")
      .max(25, "Confirm password must be no more than 25 characters"),
  })
  .refine((data: any) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  });
