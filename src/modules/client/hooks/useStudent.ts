import { trpc } from "@/utils/trpc";

const useStudent = () => {
  const { data } = trpc.student.self.student.useQuery();

  const student = data?.student;

  return {
    student: student ?? null,
    staleTime: 60 * 10000, // 10 minute
  };
};

export default useStudent;
