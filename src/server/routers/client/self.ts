import prisma from "../../../../prisma/db";
import { router, studentProcedure } from "../../trpc";

/**
 *  This route get the data based on the user session
 */
export const selfRoute = router({
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
});
