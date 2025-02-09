import prisma from "@/lib/prisma";
import { publicProcedure , createTRPCRouter } from "../init";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure .query(async () => {
    return prisma.book.findMany({
      include: {
        category: true,
        reviews: true,
      },
    });
  }),


});
