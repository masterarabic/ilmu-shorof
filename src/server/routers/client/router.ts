import { router } from "@/server/trpc";

import { belajarRoute } from "./belajar";
import { listBabRoute } from "./listBab";
import { selfRoute } from "./self";

export const clientRouter = router({
  self: selfRoute,
  belajar: belajarRoute,
  listBab: listBabRoute,
});
