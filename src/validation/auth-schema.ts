import z from "zod";
export const authSchema = z.object({
  username: z
    .string()
    .min(2, "username must be 2 characters long")
    .max(16, "username cannot be more than 16 character"),
  password: z
    .string()
    .min(8, "password must be 8 characters long")
    .max(24, "password cannot be more than 16 characters"),
});

export type authBody = z.infer<typeof authSchema>;
