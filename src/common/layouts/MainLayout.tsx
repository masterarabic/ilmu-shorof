import { ReactNode } from "react";

import SidebarDesktop from "../components/SidebarDesktop";
import { cn } from "../utils";

const ClientMainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("flex", "md:pl-[60px]", "lg:pl-[250px]")}>
      <SidebarDesktop />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ClientMainLayout;
