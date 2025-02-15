import { z } from "zod";

export const deleteBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
});
