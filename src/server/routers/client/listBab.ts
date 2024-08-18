import { z } from "zod";

import prisma from "../../../../prisma/db";
import { router, studentProcedure } from "../../trpc";

export const listBabRoute = router({
  listBab: studentProcedure.input(z.object({})).query(async () => {
    const bab = await prisma.bab.findMany();

    return {
      bab,
    };
  }),
});
