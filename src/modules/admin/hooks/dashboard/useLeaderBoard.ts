import { trpc } from "@/utils/trpc";

const useLeaderBoard = () => {
  const { data } = trpc.admin.dashboard.leaderBoard.useQuery();

  return {
    leaderBoard: data?.docs ?? [],
    loadingLeaderBoard: false,
  };
};

export default useLeaderBoard;
