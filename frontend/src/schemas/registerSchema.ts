import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username must be atleast 2 characters")
      .max(20, "Username must be no more than 25  characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be atleast 8 characters")
      .max(25, "Password must be no more than 25 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be atleast 8 characters")
      .max(25, "Confirm password must be no more than 25 characters"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });
