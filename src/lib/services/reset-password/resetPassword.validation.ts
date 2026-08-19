import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const ResetPasswordSchema = z.object({
    new_password: passwordSchema,
});

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;