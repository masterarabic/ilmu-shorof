import { z } from "zod";

import prisma from "../../../../prisma/db";
import { router, studentProcedure } from "../../trpc";

/**
 *  This route get the data based on the user session
 */
export const selfRoute = router({
  updateSetting: studentProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const student = await prisma.user.update({
        where: {
          id: ctx?.session?.user?.id,
        },
        data: {
          name: input.name,
        },
      });

      return {
        student,
      };
    }),
  student: studentProcedure.query(async ({ ctx }) => {
    const student = await prisma.student.findFirst({
      where: {
        userId: ctx?.session?.user?.id,
      },
      include: {
        latestBab: {
          select: {
            id: true,
            number: true,
          },
        },
      },
    });

    return {
      student,
    };
  }),
  score: studentProcedure
    .input(
      z.object({
        studentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await prisma.studentLessonResult.aggregate({
        _sum: {
          score: true,
        },
        where: {
          studentId: input.studentId,
        },
      });

      return {
        score: result?._sum?.score ?? 0,
      };
    }),
  progress: studentProcedure
    .input(
      z.object({
        studentId: z.string(),
        babId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const totalLesson = await prisma.lesson.count({
        where: {
          subBab: {
            babId: input.babId,
          },
        },
      });
      const myLesson = await prisma.studentLessonResult.count({
        where: {
          studentId: input.studentId,
          lesson: {
            subBab: {
              babId: input.babId,
            },
          },
        },
      });

      return {
        myLesson,
        totalLesson,
      };
    }),
});
