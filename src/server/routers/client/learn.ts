import { z } from "zod";

import prisma from "../../../../prisma/db";
import { router, studentProcedure } from "../../trpc";

export const learnRoute = router({
  isBabExist: studentProcedure
    .input(z.object({ babNumber: z.number() }))
    .query(async ({ input }) => {
      const bab = await prisma.bab.findFirst({
        where: {
          number: input.babNumber,
        },
      });

      return {
        isExist: !!bab,
      };
    }),
  bab: studentProcedure
    .input(
      z.object({
        babNumber: z.number(),
      })
    )
    .query(async ({ input }) => {
      const bab = await prisma.bab.findFirst({
        where: {
          number: input.babNumber,
        },
      });

      return {
        bab,
      };
    }),
  subBabList: studentProcedure
    .input(
      z.object({
        babId: z.string(),
        studentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const subBabList = await prisma.subBab.findMany({
        where: {
          babId: input.babId,
        },
        include: {
          lesson: {
            include: {
              studentLessonResult: {
                where: {
                  studentId: input.studentId,
                },
                take: 1,
              },
            },
            orderBy: {
              number: "asc",
            },
          },
        },
        orderBy: {
          number: "asc",
        },
      });

      return {
        subBabList,
      };
    }),

  updateLastBab: studentProcedure
    .input(z.object({ babNumber: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const bab = await prisma.bab.findFirst({
        where: {
          number: input.babNumber,
        },
      });

      await prisma.student.update({
        where: {
          userId: ctx?.session?.user?.id,
        },
        data: {
          latestBabId: bab?.id,
        },
      });

      return {
        success: true,
      };
    }),
});
