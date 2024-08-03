/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import prisma from "../../../prisma/db";
import { publicProcedure, router } from "../trpc";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */
const defaultSelect = {
  id: true,
  name: true,
  number: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BabSelect;

export const babRouter = router({
  list: publicProcedure
    .input(
      z.object({
        with: z.string().optional().or(z.array(z.string())).optional(),
        id: z.string().uuid().optional(),
      })
    )
    .query(async ({ input }) => {
      const withFields = input.with
        ? Array.isArray(input.with)
          ? input.with
          : [input.with]
        : [];

      const whereInput: Prisma.BabWhereInput = {};

      if (input.id) whereInput.id = input.id;

      const items = await prisma.bab.findMany({
        select: defaultSelect,
        where: whereInput,
        orderBy: {
          number: "asc",
        },
      });

      return {
        items,
      };
    }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        number: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      const post = await prisma.bab.create({
        data: input,
        select: defaultSelect,
      });
      return post;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        number: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const post = await prisma.bab.update({
        where: {
          id,
        },
        data,
        select: defaultSelect,
      });
      return post;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const post = await prisma.bab.delete({
        where: {
          id,
        },
        select: defaultSelect,
      });
      return post;
    }),
});
