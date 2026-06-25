import z from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const RegisterSchema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.email(),
    password: passwordSchema,
    confirm_password: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password did not match',
            path: ["confirm_password"]
        })
    }
})

export type RegisterFormData = z.infer<typeof RegisterSchema>