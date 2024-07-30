import React from "react";

const StatSection = () => {
  return (
    <section className="mb-3 border px-4 rounded-md py-4">
      <div className="text-base mb-2 font-semibold text-neutral-600">
        Progress belajar
      </div>
      <div className="w-full bg-[#bcbaff] rounded-full h-2.5">
        <div
          className="bg-[#6A65FF] h-2.5 rounded-full"
          style={{
            width: `${60}%`,
          }}
        />
      </div>
      <div className="text-sm flex items-center justify-between text-neutral-500">
        <span>60 dari 100 soal</span>
        <span>60%</span>
      </div>
    </section>
  );
};

export default StatSection;
