import { createTRPCRouter } from "../init";
import { bookRouter } from "./book.router";

export const appRouter = createTRPCRouter({
  book: bookRouter,
});

export type AppRouter = typeof appRouter;
