/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, router } from "../trpc";
import { babRouter } from "./admin/bab";
import { lessonRouter } from "./admin/lesson";
import { questionRouter } from "./admin/question";
import { settingRouter } from "./admin/setting";
import { subBabRouter } from "./admin/subBab";
import { student } from "./client/router";

export const appRouter = router({
  bab: babRouter,
  subBab: subBabRouter,
  lesson: lessonRouter,
  question: questionRouter,
  setting: settingRouter,

  student: student,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
