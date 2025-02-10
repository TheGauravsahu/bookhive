import { addBookSchema } from "@/components/books/addBook/addBook.schema";
import { publicProcedure, createTRPCRouter } from "../init";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    console.log("Context:", ctx.db.book.findMany());
    return ctx.db.book.findMany({
      include: {
        reviews: true,
      },
    });
  }),

  add: publicProcedure.input(addBookSchema).mutation(async ({ ctx, input }) => {
    console.log("Input:", input);
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
