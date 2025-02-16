import {
  addReviewSchema,
  deleteReviewSchema,
  getAllReviewSchema,
  getReviewDetailSchema,
} from "@/components/books/reviews/review.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const reviewRouter = createTRPCRouter({
  add: protectedProcedure
    .input(addReviewSchema)
    .mutation(
      async ({ ctx: { session, db }, input: { bookId, review, rating } }) => {
        try {
          await db.review.create({
            data: {
              comment: review,
              userId: session.user.id,
              rating,
              bookId,
            },
          });
        } catch (error) {
          console.log("Failed to add review", error);
          throw Error("Failed to add review");
        }
      }
    ),

  getAll: publicProcedure
    .input(getAllReviewSchema)
    .query(async ({ ctx, input: { bookId } }) => {
      return await ctx.db.review.findMany({
        where: {
          bookId,
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      });
    }),

  getDetails: protectedProcedure
    .input(getReviewDetailSchema)
    .mutation(async ({ ctx: { db }, input: { id } }) => {
      return await db.review.findFirstOrThrow({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      });
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
