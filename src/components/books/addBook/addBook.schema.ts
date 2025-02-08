import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(255, "Author name is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),
  coverImage: z.string().url("Invalid URL").optional(),
  categoryId: z.string().optional(),
});

export type AddBookFormValues = z.infer<typeof addBookSchema>;
