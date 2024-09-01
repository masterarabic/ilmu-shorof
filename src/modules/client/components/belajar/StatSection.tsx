import React, { FC } from "react";

import { Progress } from "@/common/components/ui/progress";

import useBab from "../../hooks/useBab";
import useProgress from "../../hooks/useProgress";

const StatSection: FC<{ babNumber: number }> = ({ babNumber }) => {
  const { bab } = useBab({ babNumber });
  const { myLesson, totalLesson, progress } = useProgress({ babId: bab?.id! });

  return (
    <section className="flex flex-col-reverse md:flex-col md:mb-3 md:border md:px-4 rounded-md md:py-4">
      <div className="hidden md:block text-base mb-2 font-semibold text-neutral-600">
        Progress belajar
      </div>
      <div>
        <Progress value={progress} />
      </div>
      <div className="text-sm flex items-center justify-between text-neutral-500">
        <span>
          {myLesson} dari {totalLesson} pelajaran
        </span>
        <span>{progress}%</span>
      </div>
    </section>
  );
};

export default StatSection;
