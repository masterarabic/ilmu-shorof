import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, router } from "@/server/trpc";

import prisma from "../../../../prisma/db";
import { defaultSelectLesson } from "./lesson";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */
const defaultSelect = {
  id: true,
  number: true,
  question: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.QuestionSelect;

const withEnum = z.enum(["lesson", "answers"]);

export const questionRouter = router({
  list: adminProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        with: withEnum.optional().or(z.array(withEnum)).optional(),
        lessonId: z.string().uuid().optional(),
      })
    )
    .query(async ({ input }) => {
      const withFields = input.with
        ? Array.isArray(input.with)
          ? input.with
          : [input.with]
        : [];

      const includeInput: Prisma.QuestionInclude = {};
      if (withFields.includes("lesson")) includeInput.lesson = true;
      if (withFields.includes("answers")) includeInput.answer = true;

      const whereInput: Prisma.QuestionWhereInput = {};
      if (input.id) whereInput.id = input.id;
      if (input.lessonId) whereInput.lessonId = input.lessonId;

      const items = await prisma.question.findMany({
        select: {
          ...defaultSelect,
          lesson: includeInput.lesson
            ? {
                select: defaultSelectLesson,
              }
            : undefined,
          answer: includeInput.answer
            ? {
                select: {
                  id: true,
                  isCorrect: true,
                  answer: true,
                  number: true,
                },
                orderBy: {
                  number: "asc",
                },
              }
            : undefined,
        },
        where: whereInput,
        orderBy: {
          number: "asc",
        },
      });

      return {
        items,
      };
    }),
  bulk: adminProcedure
    .input(
      z.object({
        lessonId: z.string().uuid(),
        items: z.array(
          z.object({
            id: z.string().uuid(),
            number: z.number().min(1),
            question: z.string(),
            answers: z.array(
              z.object({
                id: z.string().uuid(),
                number: z.number().min(1),
                text: z.string(),
                correct: z.boolean(),
              })
            ),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      prisma.$transaction(async (trx) => {
        // get all questions
        const questions = await trx.question.findMany({
          where: {
            lessonId: input.lessonId,
          },
        });

        // check if existing question not in items then delete
        const deleteQuestionsId: string[] = [];
        for (const question of questions) {
          if (!input.items.some((item) => item.id === question.id)) {
            deleteQuestionsId.push(question.id);
          }
        }
        await trx.question.deleteMany({
          where: {
            id: {
              in: deleteQuestionsId,
            },
          },
        });

        // check if existing answer not in items then delete
        const answers = await trx.answer.findMany({
          where: {
            question: {
              lessonId: input.lessonId,
            },
          },
        });
        const deleteAnswersId: string[] = [];
        const flattenAnswers = input.items.flatMap((item) => item.answers);
        for (const answer of answers) {
          if (!flattenAnswers.some((item) => item.id === answer.id)) {
            deleteAnswersId.push(answer.id);
          }
        }
        await trx.answer.deleteMany({
          where: {
            id: {
              in: deleteAnswersId,
            },
          },
        });

        // create or update questions
        for (const item of input.items) {
          await trx.question.upsert({
            where: {
              id: item.id,
            },
            update: {
              number: item.number,
              question: item.question,
            },
            create: {
              id: item.id,
              number: item.number,
              question: item.question,
              lesson: {
                connect: {
                  id: input.lessonId,
                },
              },
            },
          });

          // create or update answers
          for (const answer of item.answers) {
            await trx.answer.upsert({
              where: {
                id: answer.id,
              },
              update: {
                answer: answer.text,
                isCorrect: answer.correct,
                number: answer.number,
              },
              create: {
                answer: answer.text,
                isCorrect: answer.correct,
                number: answer.number,
                questionId: item.id,
              },
            });
          }
        }
      });
      return {};
    }),
});
