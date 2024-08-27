/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, router } from "../trpc";
import { admin } from "./admin/router";
import { student } from "./client/router";

export const appRouter = router({
  admin: admin,
  student: student,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
