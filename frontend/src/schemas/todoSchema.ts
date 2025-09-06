import { z } from "zod";

export const todoSchema = z.object({
  content: z
    .string()
    .trim()
    .min(2, "Todo must be atleast 2 characters")
    .max(80, "Todo must be no more than 80 characters"),
});
