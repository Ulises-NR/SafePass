import { z } from "zod";

export const passwordSchema = z.object({
  account: z
    .string({ invalid_type_error: "Account must be a string." })
    .optional(),
  notes: z.string({ invalid_type_error: "Notes must be a string." }).optional(),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(2, "Password must be at least 2 characters long.")
    .max(32, "Password must have a maximum of 32 characters."),
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    })
    .min(2, "Title must be at least 2 characters long.")
    .max(32, "Title must have a maximum of 32 characters."),
  username: z.string({
    required_error: "Username is required.",
    invalid_type_error: "Username must be a string.",
  }),
  website: z
    .string({ invalid_type_error: "Website must be a string." })
    .url("Incorrect format")
    .optional(),
});
