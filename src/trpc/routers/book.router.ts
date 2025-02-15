import { addBookSchema } from "@/components/books/addBook/addBook.schema";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import { deleteBookSchema } from "@/components/books/books.schema";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  getDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.book.findFirst({
        where: {
          id,
        },
        include: {
          favorites: true,
        },
      });
    }),

  add: protectedProcedure
    .input(addBookSchema)
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.db.book.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          description: input.description,
          category: input.category!,
          coverImage: input.coverImage!,
          author: input.author,
        },
      });

      return book;
    }),

  delete: protectedProcedure
    .input(deleteBookSchema)
    .mutation(async ({ ctx: { db }, input: { bookId } }) => {
      await db.book.delete({
        where: {
          id: bookId,
        },
      });
    }),
});
