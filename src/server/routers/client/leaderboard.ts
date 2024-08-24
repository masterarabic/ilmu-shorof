import { router, studentProcedure } from "@/server/trpc";

import prisma from "../../../../prisma/db";

export const leaderboardRoute = router({
  list: studentProcedure.query(async () => {
    const lessonResults = await prisma.studentLessonResult.groupBy({
      by: ["studentId"],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: "desc",
        },
      },
      take: 100,
    });

    const studentIds = lessonResults.map((item) => item.studentId);

    const students = await prisma.student.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      where: {
        id: {
          in: studentIds,
        },
      },
    });

    const studentMap = students.reduce(
      (acc, item) => {
        acc[item.id!] = item;
        return acc;
      },
      {} as Record<string, (typeof students)[number]>
    );

    const leaderboard = lessonResults.map((item) => {
      const student = studentMap[item.studentId];
      return {
        id: item.studentId,
        name: student?.user?.name,
        image: student?.user?.image,
        score: item?._sum?.score ?? 0,
      };
    });

    return {
      leaderboard,
    };
  }),
});
