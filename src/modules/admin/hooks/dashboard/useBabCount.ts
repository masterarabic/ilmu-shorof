import { trpc } from "@/utils/trpc";

const useBabCount = () => {
  const { data } = trpc.admin.dashboard.babCount.useQuery();

  return {
    babCount: data?.count ?? 0,
    loadingBabCount: false,
  };
};

export default useBabCount;
