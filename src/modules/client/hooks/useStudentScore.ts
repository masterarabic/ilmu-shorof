import { trpc } from "@/utils/trpc";

import useStudent from "./useStudent";

const useScore = () => {
  const { student } = useStudent();
  const { data } = trpc.student.self.score.useQuery(
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
  };
};

export default useScore;
