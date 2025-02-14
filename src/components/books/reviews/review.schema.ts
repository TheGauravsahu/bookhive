import { z } from "zod";

export const addReviewSchema = z.object({
  review: z.string().min(3, "Review must be at least 3 characters long."),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  bookId: z.string().min(1, "Book ID is required"),
});

export const deleteReviewSchema = z.object({
  reviewId: z.string().min(1, "Review ID is required"),
});

export const getAllReviewSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
});
