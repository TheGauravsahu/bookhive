import { signupSchema } from "@/components/auth/auth.schema";
import { createTRPCRouter, publicProcedure } from "../init";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) throw Error("User already exists.");

      const hasedPassword = await bcrypt.hash(input.password, 10);

      const newUser = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hasedPassword,
        },
      });

      return newUser;
    }),
});
