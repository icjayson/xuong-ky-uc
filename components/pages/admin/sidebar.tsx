"use client";

import BurgerIcon from "@/components/icons/burger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import MainSidebar from "@/components/pages/main/sidebar";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "border-r border-black-20 w-[80px] px-4 py-6 transition-all flex flex-col sticky left-0 top-0 max-h-screen",
        {
          "w-[256px] px-6": !isCollapsed
        },
        className
      )}
    >
      <div
        className={cn("flex items-center gap-10", {
          "flex-col-reverse": isCollapsed
        })}
      >
        <Avatar
          className={cn("w-[50px] h-[50px]", "max-sm:w-[40px] max-sm:h-[40px]")}
        >
          <AvatarImage src="/logo.png" />
          <AvatarFallback>XKU</AvatarFallback>
        </Avatar>

        <Button
          variant="primary"
          anomaly="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <BurgerIcon /> : "X"}
        </Button>
      </div>

      <div className={cn("text-xl font-semibold text-black mt-4 mb-2 px-3")}>
        {!isCollapsed && "Khám phá"}
      </div>

      <MainSidebar isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
