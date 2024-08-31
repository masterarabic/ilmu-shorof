import { trpc } from "@/utils/trpc";

import useStudent from "./useStudent";

const useScore = () => {
  const { student } = useStudent();
  const { data, isLoading } = trpc.student.self.score.useQuery(
    {
      studentId: student?.id!,
    },
    {
      enabled: !!student?.id,
    }
  );

  const score = data?.score ?? 0;

  return {
    score,
    loadingScore: isLoading,
  };
};

export default useScore;
