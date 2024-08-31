import { RouterOutput, trpc } from "@/utils/trpc";

export type LeaderboardItem =
  RouterOutput["student"]["leaderboard"]["list"]["leaderboard"][number];

const useLeaderboard = () => {
  const {
    data,
    isLoading: loadingLeaderboard,
    error: errorLeaderboard,
  } = trpc.student.leaderboard.list.useQuery(undefined, {
    // 10 minutes
    staleTime: 1000 * 60 * 10,
  });
  const leaderboard = data?.leaderboard ?? [];

  return {
    leaderboard,
    loadingLeaderboard,
    errorLeaderboard,
  };
};

export default useLeaderboard;
