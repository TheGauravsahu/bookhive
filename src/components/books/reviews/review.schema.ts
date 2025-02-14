import { z } from "zod";

export const addReviewSchema = z.object({
  review: z.string().min(3, "Review must be atleast 3 characters long."),
  bookId: z.string().min(1, "Book ID is required"),
});

export const deleteReviewSchema = z.object({
  reviewId: z.string().min(1, "Review ID is required"),
});

export const getAllReviewSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),

})