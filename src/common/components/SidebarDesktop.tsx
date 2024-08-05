import { signOut } from "next-auth/react";
import React from "react";

import HomeIcon from "../icons/Home";
import LeaderBoardIcon from "../icons/Leaderboard";
import SettingIcon from "../icons/Setting";
import { cn } from "../utils";
import { Button } from "./ui/button";

const menuItems = [
  {
    id: "learn",
    name: "Belajar",
    icon: <HomeIcon className="size-7" />,
  },
  {
    id: "ranking",
    name: "Papan Peringkat",
    icon: <LeaderBoardIcon className="size-7" />,
  },
  {
    id: "setting",
    name: "Pengaturan",
    icon: <SettingIcon className="size-7" />,
  },
];

const SidebarDesktop = () => {
  return (
    <div
      className={cn(
        "hidden",
        "md:flex md:px-1 w-[60px] h-svh block fixed left-0 border-r border-neutral-200 flex-col",
        "lg:w-[250px] lg:px-3"
      )}
    >
      <div
        className={cn(
          "text-xs flex items-center text-center justify-center my-5 text-[#6A65FF] font-bold",
          "lg:text-2xl"
        )}
      >
        Belajar <br /> Bahasa Arab
      </div>
      <div className="flex-1 flex flex-col mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-left flex leading-[28px] gap-x-3 px-3 text-neutral-600 font-medium py-3 rounded hover:bg-neutral-200/30"
          >
            {item.icon}
            <span className={cn("hidden", "lg:inline-block")}>{item.name}</span>
          </button>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Keluar
      </Button>
    </div>
  );
};

export default SidebarDesktop;
