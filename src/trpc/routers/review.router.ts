import {
  addReviewSchema,
  deleteReviewSchema,
} from "@/components/books/reviews/review.schema";
import { createTRPCRouter, protectedProcedure } from "../init";

export const reviewRouter = createTRPCRouter({
  add: protectedProcedure
    .input(addReviewSchema)
    .mutation(async ({ ctx: { session, db }, input: { bookId, review } }) => {
      try {
        await db.review.create({
          data: {
            comment: review,
            userId: session.user.id,
            rating: 5,
            bookId,
          },
        });
      } catch (error) {
        console.log("Failed to add review", error);
        throw Error("Failed to add review");
      }
    }),

  delete: protectedProcedure
    .input(deleteReviewSchema)
    .mutation(async ({ ctx: { db }, input: { reviewId } }) => {
      try {
        await db.review.delete({
          where: {
            id: reviewId,
          },
        });
      } catch (error) {
        console.log("Failed to delete review", error);
        throw Error("Failed to delete review");
      }
    }),
});
