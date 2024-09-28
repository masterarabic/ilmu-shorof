import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.$transaction(async (tx) => {
  const students = await prisma.student.findMany();
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
  });

  for (const student of students) {
    const score = lessonResults.find((item) => item.studentId === student.id);
    await prisma.student.update({
      where: { id: student.id },
      data: {
        score: score?._sum?.score ?? 0,
      },
    });
  }
  // });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
