import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name is required").max(255),
  email: z.string().email().min(5),
  password: z.string().min(5, "Password is required").max(255),
});
