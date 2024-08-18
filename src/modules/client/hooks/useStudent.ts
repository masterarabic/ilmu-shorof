import { trpc } from "@/utils/trpc";

const useStudent = () => {
  const { data } = trpc.client.self.student.useQuery();

  const student = data?.student;

  console.log(student);

  return {
    student: student ?? null,
  };
};

export default useStudent;
