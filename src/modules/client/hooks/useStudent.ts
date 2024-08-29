import { trpc } from "@/utils/trpc";

const useStudent = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const { data, isLoading } = trpc.student.self.student.useQuery(undefined, {
    enabled,
  });

  const student = data?.student;

  return {
    student: student ?? null,
    staleTime: 60 * 10000, // 10 minute
    loadingStudent: isLoading,
  };
};

export default useStudent;
