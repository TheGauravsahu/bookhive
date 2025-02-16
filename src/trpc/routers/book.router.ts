import { addBookSchema } from "@/components/books/addBook/addBook.schema";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import { deleteBookSchema } from "@/components/books/books.schema";
import { editBookSchema } from "@/components/books/editBook/editBook.schema";

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

  edit: protectedProcedure
    .input(editBookSchema)
    .mutation(
      async ({
        ctx,
        input: { bookId, title, description, author, category, coverImage },
      }) => {
        await ctx.db.book.update({
          where: {
            id: bookId,
          },
          data: {
            title,
            description,
            author,
            category,
            coverImage,
          },
        });
      }
    ),

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
