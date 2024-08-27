import { RouterOutput, trpc } from "@/utils/trpc";

export type StudentBabDataType =
  RouterOutput["admin"]["student"]["listBab"]["docs"][number];

const useStudentBabList = ({ id }: { id: string }) => {
  const { data, isLoading } = trpc.admin.student.listBab.useQuery({
    studentId: id,
  });

  const studentBabList = data?.docs ?? [];

  return {
    studentBabList,
    loadingStudentBabList: isLoading,
  };
};

export default useStudentBabList;
