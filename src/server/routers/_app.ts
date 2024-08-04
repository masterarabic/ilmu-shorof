/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from "../trpc";
import { babRouter } from "./bab";
import { lessonRouter } from "./lesson";
import { questionRouter } from "./question";
import { subBabRouter } from "./subBab";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  bab: babRouter,
  subBab: subBabRouter,
  lesson: lessonRouter,
  question: questionRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
