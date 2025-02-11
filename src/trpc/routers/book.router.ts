import { addBookSchema } from "@/components/books/addBook/addBook.schema";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.book.findMany({
      include: {
        reviews: true,
      },
    });
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.book.findFirst({
        where: {
          id,
        },
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true,
                }
              }
            }
          },
          favorites: true,
        }
      });
    }),

  add: protectedProcedure
    .input(addBookSchema)
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.db.book.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category!,
          coverImage: input.coverImage!,
          author: input.author,
        },
      });

      return book;
    }),
});
