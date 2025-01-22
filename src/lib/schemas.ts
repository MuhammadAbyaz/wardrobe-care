import { z } from "zod";
export const signUpSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN", "NGO"]),
});
