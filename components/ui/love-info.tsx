import { cn } from "@/lib/utils";
import React from "react";

type LoveInfoProps = {
  name: string;
  nickName: string;
  dateOfBirth: string;
  zodiac: string;
};

const LoveInfo = ({ name, nickName, dateOfBirth, zodiac }: LoveInfoProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={cn("text-2xl font-medium text-black", "max-sm:text-xs")}>
        {name}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className={cn("text-xl text-black-80", "max-sm:text-[10px]")}>
          {nickName}
        </div>
        <div className={cn("text-base text-black-60", "max-sm:text-[8px]")}>
          {dateOfBirth}
        </div>
        <div className={cn("text-base text-black-60", "max-sm:text-[8px]")}>
          {zodiac}
        </div>
      </div>
    </div>
  );
};

export default LoveInfo;
