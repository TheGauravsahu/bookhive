import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characaters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be atleast 6 characaters long."),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be atleast 6 characaters long."),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;

