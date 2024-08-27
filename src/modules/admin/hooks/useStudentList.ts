import { RouterOutput, trpc } from "@/utils/trpc";

export type StudentDataType =
  RouterOutput["admin"]["student"]["list"]["docs"][number];

const useStudentList = () => {
  const { data, isLoading } = trpc.admin.student.list.useQuery({});

  const studentList = data?.docs ?? [];

  return {
    studentList,
    loadingStudentList: isLoading,
  };
};

export default useStudentList;
