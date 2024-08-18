import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

import useBab from "./useBab";

export type SubBabWithLesson =
  inferRouterOutputs<AppRouter>["client"]["belajar"]["subBabList"]["subBabList"][number];

const useSubBabList = ({ babNumber }: { babNumber: number }) => {
  const { bab } = useBab({ babNumber });
  const { data, isLoading, error } = trpc.client.belajar.subBabList.useQuery(
    {
      babId: bab?.id!,
    },
    {
      enabled: !!bab,
      staleTime: 60 * 10000, // 10 minute
    }
  );

  return {
    subBabList: data?.subBabList,
    isLoading,
    error,
  };
};

export default useSubBabList;
