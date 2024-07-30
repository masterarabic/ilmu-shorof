import React from "react";

import { cn } from "@/common/utils";

import ProfileSection from "./ProfileSection";
import { ShareSection } from "./ShareSection";
import StatSection from "./StatSection";

const Bab = () => {
  return (
    <section className="min-h-svh flex">
      <div
        className={cn(
          "flex-1 relative flex flex-col",
          "md:pt-4 md:mx-12 md:pb-4"
        )}
      ></div>
      <div
        className={cn(
          "hidden",
          "md:flex relative flex-col w-[330px] pb-6 pt-4 pr-6"
        )}
      >
        <div className="h-6"></div>
        <div className="flex sticky h-svh top-0 flex-col flex-1">
          <ProfileSection />
          <StatSection />
          <ShareSection />
        </div>
      </div>
    </section>
  );
};

export default Bab;
