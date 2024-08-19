import { z } from "zod";

import prisma from "../../../../prisma/db";
import { router, studentProcedure } from "../../trpc";

export const lessonRoute = router({
  data: studentProcedure
    .input(
      z.object({
        babNumber: z.number(),
        subBabNumber: z.number(),
        lessonNumber: z.number(),
      })
    )
    .query(async ({ input }) => {
      const bab = await prisma.bab.findFirst({
        select: {
          id: true,
          number: true,
        },
        where: {
          number: input.babNumber,
        },
      });
      if (!bab) throw new Error("Bab not found");

      const subBab = await prisma.subBab.findFirst({
        select: {
          id: true,
          number: true,
        },
        where: {
          babId: bab.id,
          number: input.subBabNumber,
        },
      });

      if (!subBab) throw new Error("SubBab not found");

      const lesson = await prisma.lesson.findFirst({
        select: {
          id: true,
          number: true,
        },
        where: {
          subBabId: subBab.id,
          number: input.lessonNumber,
        },
      });

      return {
        bab,
        subBab,
        lesson,
      };
    }),
  checkAnswer: studentProcedure
    .input(
      z.object({
        questionId: z.string(),
        answerId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const answer = await prisma.answer.findFirst({
        where: {
          id: input.answerId,
          questionId: input.questionId,
        },
      });

      if (!answer) throw new Error("Answer not found");

      return {
        isCorrect: answer.isCorrect,
      };
    }),
  listQuestion: studentProcedure
    .input(
      z.object({
        lessonId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const lesson = await prisma.lesson.findFirst({
        where: {
          id: input.lessonId,
        },
      });

      if (!lesson) throw new Error("Lesson not found");

      const questions = await prisma.question.findMany({
        select: {
          id: true,
          question: true,
          number: true,
          answer: {
            select: {
              id: true,
              answer: true,
              number: true,
            },
          },
        },
        where: {
          lessonId: lesson.id,
        },
      });

      return {
        questions,
      };
    }),
});
