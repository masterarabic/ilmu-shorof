import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";

import ScoreIcon from "@/common/icons/Score";

import useScore from "../../hooks/useStudentScore";

const ProfileSection = () => {
  const { data } = useSession();
  const { score } = useScore();

  return (
    <div className="flex items-center justify-between text-neutral-500">
      <div className="flex gap-2 items-center">
        <Image
          alt="profile"
          src={data?.user?.image ?? ""}
          width={36}
          height={36}
          className="size-9 rounded-full bg-neutral-300"
        />
        <span>{data?.user?.name ?? "-"}</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <span>{score}</span>
        <ScoreIcon className="size-6" />
      </div>
    </div>
  );
};

export default ProfileSection;
