import { useMemo } from "react";

import { trpc } from "@/utils/trpc";

type Config = {
  randomizeQuestion: boolean;
  randomizeAnswer: boolean;
  defaultScore: number;
};

export const defaultConfig: Config = {
  randomizeQuestion: false,
  randomizeAnswer: false,
  defaultScore: 15,
};

const useSystemSetting = () => {
  const { data: settingData, isLoading } = trpc.setting.list.useQuery(
    {},
    {
      // 10 minutes
      staleTime: 1000 * 60 * 10,
    }
  );
  const setting = settingData?.items;

  const config: Config = useMemo(() => {
    if (isLoading) return defaultConfig;
    return {
      randomizeQuestion:
        (setting?.find((item) => item.name === "randomizeQuestion")?.value ??
          defaultConfig.randomizeQuestion.toString) === "true",
      randomizeAnswer:
        (setting?.find((item) => item.name === "randomizeAnswer")?.value ??
          defaultConfig.randomizeAnswer.toString()) === "true",
      defaultScore: Number(
        setting?.find((item) => item.name === "defaultScore")?.value ??
          defaultConfig.defaultScore
      ),
    };
  }, [setting, isLoading]);

  return {
    config,
    loading: isLoading,
  };
};

export default useSystemSetting;
