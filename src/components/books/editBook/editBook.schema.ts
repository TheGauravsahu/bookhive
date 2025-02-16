import { z } from "zod";

export const editBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
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
  category: z.string().optional(),
});

export type EditBookFormValues = z.infer<typeof editBookSchema>;
