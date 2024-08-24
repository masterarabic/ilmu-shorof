import { z } from "zod";

import { generateConfig } from "@/common/hooks/useSystemSetting";

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
  submit: studentProcedure
    .input(
      z.object({
        studentId: z.string(),
        lessonId: z.string(),
        heartCount: z.number(),
        answers: z.array(
          z.object({
            questionId: z.string(),
            answerId: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const questions = await prisma.question.findMany({
        where: {
          lessonId: input.lessonId,
        },
      });

      const correctAnswers = await prisma.answer.findMany({
        where: {
          questionId: {
            in: questions.map((question) => question.id),
          },
          isCorrect: true,
        },
      });

      const correctAnswerIds = correctAnswers.map((answer) => answer.id);

      const totalCorrect = input.answers.filter((answer) =>
        correctAnswerIds.includes(answer.answerId)
      ).length;

      const configs = await prisma.setting.findMany();
      const config = generateConfig(configs);

      const score = totalCorrect * config.defaultScore;
      const star = input.heartCount; // TODO: calculate star

      const lessonResult = await prisma.studentLessonResult.findFirst({
        where: {
          studentId: input.studentId,
          lessonId: input.lessonId,
        },
      });

      await prisma.studentLessonResult.upsert({
        create: {
          lessonId: input.lessonId,
          studentId: input.studentId,
          score,
          star,
        },
        update: {
          score,
          star,
        },
        where: {
          id: lessonResult?.id,
          studentId: input.studentId,
          lessonId: input.lessonId,
        },
      });

      return {
        totalQuestion: questions.length,
        totalCorrect,
        star,
        score,
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
