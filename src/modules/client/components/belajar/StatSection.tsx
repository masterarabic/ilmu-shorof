import React from "react";

import { Progress } from "@/common/components/ui/progress";

const StatSection = () => {
  return (
    <section className="mb-3 border px-4 rounded-md py-4">
      <div className="text-base mb-2 font-semibold text-neutral-600">
        Progress belajar
      </div>
      <div>
        <Progress value={70} />
      </div>
      <div className="text-sm flex items-center justify-between text-neutral-500">
        <span>60 dari 100 soal</span>
        <span>60%</span>
      </div>
    </section>
  );
};

export default StatSection;
