import React, { FC } from "react";

import { cn } from "@/common/utils";

import Header from "./Header";
import Lessons from "./Lessons";
import ProfileSection from "./ProfileSection";
import ShareSection from "./ShareSection";
import StatSection from "./StatSection";

type BabProps = {
  babNumber: number;
};

const Bab: FC<BabProps> = ({ babNumber }) => {
  return (
    <section className="min-h-svh flex">
      <div className={cn("flex-1 relative flex flex-col", "md:py-4 md:mx-12")}>
        <Header babNumber={babNumber} />
        <Lessons babNumber={babNumber} />
      </div>
      <div
        className={cn(
          "hidden",
          "md:flex relative flex-col w-[330px] pb-6 pt-4 pr-6"
        )}
      >
        <div className="h-6"></div>
        <div className="flex sticky h-svh top-0 flex-col flex-1">
          <ProfileSection />
          <StatSection babNumber={babNumber} />
          <ShareSection url={window.location.href ?? ""} />
        </div>
      </div>
    </section>
  );
};

export default Bab;
