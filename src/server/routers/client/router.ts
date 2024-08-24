import { router } from "@/server/trpc";

import { belajarRoute } from "./belajar";
import { leaderboardRoute } from "./leaderboard";
import { lessonRoute } from "./lesson";
import { listBabRoute } from "./listBab";
import { selfRoute } from "./self";

export const student = router({
  self: selfRoute,
  belajar: belajarRoute,
  listBab: listBabRoute,
  lesson: lessonRoute,
  leaderboard: leaderboardRoute,
});
