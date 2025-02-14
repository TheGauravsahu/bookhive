import { createTRPCRouter } from "../init";
import { bookRouter } from "./book.router";
import { reviewRouter } from "./review.router";
import { userRouter } from "./user.router";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  user: userRouter,
  review: reviewRouter
});

export type AppRouter = typeof appRouter;
