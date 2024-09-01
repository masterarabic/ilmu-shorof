import { z } from "zod";

import { adminProcedure, router } from "@/server/trpc";

import prisma from "../../../../prisma/db";

type ListDataType = {
  id: string;
  name: string;
  score: number;
  progress: number;
};

type DetailDataType = {
  id: string;
  name: string;
  score: number;
  email: string;
  image: string;
};

type BabDataType = {
  id: string;
  number: number;
  name: string;
  progress: number;
  score: number;
};

type SubBabDataType = {
  id: string;
  number: number;
  name: string;
  progress: number;
  score: number;
};

export const studentRouter = router({
  list: adminProcedure.input(z.object({})).query(async () => {
    const rawResult = await prisma.$queryRaw<ListDataType[]>`
        SELECT 
            s.id, 
            u.name,
            COALESCE((
                SELECT SUM(score) FROM "StudentLessonResult" AS slr
                WHERE slr."studentId" = s."id"
            ),0) AS score,
            (
                SELECT COUNT(DISTINCT slr."lessonId") FROM "StudentLessonResult" AS slr
                WHERE slr."studentId" = s."id"
            ) AS progress
        FROM "Student" AS s
        LEFT JOIN "users" AS u  ON s."userId" = u."id"
        ORDER BY score DESC
    `;

    const totalLesson = await prisma.lesson.count();

    const docs = rawResult.map((item) => {
      return {
        id: item.id,
        name: item.name,
        score: Number(item.score ?? 0),
        myLesson: Number(item.progress ?? 0),
        totalLesson: Number(totalLesson ?? 0),
      };
    });

    return {
      docs,
    };
  }),
  detail: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { id } = input;
      const rawResult = await prisma.$queryRaw<DetailDataType[]>`
        SELECT 
            s.id,
            u.name,
            u.image,
            u.email,
            COALESCE((
                SELECT SUM(score) FROM "StudentLessonResult" AS slr
                WHERE slr."studentId" = s."id"
            ),0) AS score
        FROM "Student" AS s
        LEFT JOIN users AS u ON s."userId" = u."id"
        WHERE s."id" = ${id}
      `;

      const data = rawResult[0];

      if (!data) throw new Error("Student not found");

      const doc: DetailDataType = {
        ...data,
        score: Number(data.score ?? 0),
      };

      return {
        doc,
      };
    }),
  listBab: adminProcedure
    .input(z.object({ studentId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { studentId } = input;

      const rawResult = await prisma.$queryRaw<BabDataType[]>`
        SELECT 
            b.id,
            b.number,
            b.name,
            (
                SELECT COUNT(*) FROM "StudentLessonResult" AS slr
                JOIN "Lesson" AS l ON l."id" = slr."lessonId"
                WHERE slr."studentId" = ${studentId} AND l."babId" = b."id"
            ) AS progress,
            COALESCE((
                SELECT SUM(score) FROM "StudentLessonResult" AS slr
                JOIN "Lesson" AS l ON l."id" = slr."lessonId"
                WHERE slr."studentId" = ${studentId} AND l."babId" = b."id"
            ),0) AS score
        FROM "Bab" AS b
      `;

      const docs = rawResult.map((item) => {
        return {
          id: item.id,
          number: item.number,
          name: item.name,
          progress: Number(item.progress ?? 0),
          score: Number(item.score ?? 0),
        };
      });

      return {
        docs,
      };
    }),
  listSubBab: adminProcedure
    .input(z.object({ studentId: z.string().uuid(), babId: z.string().uuid() }))
    .query(async ({ input }) => {
      const { studentId } = input;

      const rawResult = await prisma.$queryRaw<SubBabDataType[]>`
        SELECT 
            sb.id,
            sb.number,
            sb.name,
            (
                SELECT COUNT(*) FROM "StudentLessonResult" AS slr
                JOIN Lesson AS l ON l."id" = slr."lessonId"
                WHERE slr."studentId" = ${studentId} AND l."subBabId" = sb."id"
            ) AS progress,
            COALESCE((
                SELECT SUM(score) FROM StudentLessonResult AS slr
                JOIN Lesson AS l ON l."id" = slr."lessonId"
                WHERE slr."studentId" = ${studentId} AND l."subBabId" = sb."id"
            ),0) AS score
        FROM "SubBab" AS sb
        WHERE sb."babId" = ${input.babId}
        ORDER BY sb."number"
      `;

      const docs = rawResult.map((item) => {
        return {
          id: item.id,
          number: item.number,
          name: item.name,
          progress: Number(item.progress ?? 0),
          score: Number(item.score ?? 0),
        };
      });

      return {
        docs,
      };
    }),
});
