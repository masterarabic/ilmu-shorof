import { RouterOutput, trpc } from "@/utils/trpc";

export type StudentSubBabDataType =
  RouterOutput["admin"]["student"]["listSubBab"]["docs"][number];

const useStudentSubBabList = ({
  studentId,
  babId,
}: {
  studentId: string;
  babId: string;
}) => {
  const { data, isLoading } = trpc.admin.student.listSubBab.useQuery(
    {
      studentId,
      babId,
    },
    {
      enabled: !!babId && !!studentId,
    }
  );

  const studentSubBabList = data?.docs ?? [];

  return {
    studentSubBabList,
    loadingStudentSubBabList: isLoading,
  };
};

export default useStudentSubBabList;
