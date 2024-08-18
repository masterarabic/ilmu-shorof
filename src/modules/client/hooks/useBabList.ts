import { trpc } from "@/utils/trpc";

const useBabList = () => {
  const { data } = trpc.client.listBab.listBab.useQuery({});
  const babList = data?.bab ?? [];
  return {
    babList,
  };
};

export default useBabList;
