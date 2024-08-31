import { trpc } from "@/utils/trpc";

import useStudent from "./useStudent";

const useBabList = () => {
  const { student } = useStudent();
  const {
    data,
    isLoading: loadingBabList,
    error: errorBabList,
  } = trpc.student.listBab.listBab.useQuery(
    {
      studentId: student?.id!,
    },
    {
      enabled: !!student?.id,
    }
  );
  const babList = data?.docs ?? [];
  return {
    babList,
    loadingBabList,
    errorBabList,
  };
};

export default useBabList;
