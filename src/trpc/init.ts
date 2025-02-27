import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/auth";
import db from "@/lib/db/prisma";
import { ZodError } from "zod";

export const createTRPCContext = cache(async () => {
  const heads = headers();
  const session = await auth();

  return {
    db,
    session,
    headers: heads,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
