import Image from "next/image";
import React, { FC } from "react";

import ClientMainLayout from "@/common/layouts/MainLayout";
import { cn } from "@/common/utils";
import useLeaderboard, {
  LeaderboardItem,
} from "@/modules/client/hooks/useLeaderboard";

import { NextPageWithLayout } from "../_app";

const LeaderBoardPage: NextPageWithLayout = () => {
  const { leaderboard } = useLeaderboard();

  return (
    <div className="mx-auto w-full py-12 px-6">
      <h1 className="text-xl font-bold text-primary text-center mb-8">
        Papan Peringkat
      </h1>

      <div className="flex justify-center gap-x-12 mb-16">
        <TopStudent position={2} leaderboard={leaderboard[1]} />
        <TopStudent position={1} leaderboard={leaderboard[0]} />
        <TopStudent position={3} leaderboard={leaderboard[2]} />
      </div>

      <div className="mx-auto w-full flex flex-col items-center gap-y-4">
        {leaderboard.slice(3).map((_, index) => (
          <div
            key={index}
            className="flex bg-primary w-[600px] items-center rounded-xl"
          >
            <div className="w-9 -rotate-90 flex items-center justify-center rounded-full text-white bg-primary">
              {index + 4}
            </div>
            <div className="flex flex-1 items-center justify-between pr-4 py-1 text-white">
              <div className="flex items-center">
                <div className="size-16 border rounded-full"></div>
                <div className="text-center text-lg font-semibold ml-3">
                  Rizki Fitra Rahman
                </div>
              </div>
              <div className="text-center text-lg font-semibold">100000</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopStudent: FC<{
  position: number;
  leaderboard?: LeaderboardItem;
}> = ({ position, leaderboard }) => {
  return (
    <div
      className={cn({
        "mt-8": position !== 1,
      })}
    >
      <Image
        width={120}
        height={120}
        src={leaderboard?.image ?? ""}
        className={cn("border rounded-full mx-auto", {
          "size-[120px]": position === 1,
          "size-[100px]": position !== 1,
        })}
        alt="Profile"
      />
      <div className="text-center text-lg font-semibold text-primary mt-2">
        {leaderboard?.name}
      </div>
      <div className={cn("text-center text-lg font-semibold text-primary")}>
        {leaderboard?.score}
      </div>
    </div>
  );
};

LeaderBoardPage.getLayout = (page) => {
  return <ClientMainLayout>{page}</ClientMainLayout>;
};

export default LeaderBoardPage;
