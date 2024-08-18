import { useSession } from "next-auth/react";
import React from "react";

import ScoreIcon from "@/common/icons/Score";

const ProfileSection = () => {
  const { data } = useSession();
  return (
    <div className="mb-6 flex items-center justify-between text-neutral-500">
      <div className="flex gap-2 items-center">
        <img
          src={data?.user?.image ?? ""}
          className="size-9 rounded-full bg-neutral-300"
        />
        <span>{data?.user?.name ?? "-"}</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        210
        <ScoreIcon className="size-6" />
      </div>
    </div>
  );
};

export default ProfileSection;
