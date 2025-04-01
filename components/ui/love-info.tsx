import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import React from "react";
import { format } from "date-fns";
type LoveInfoProps = {
  name: string;
  nickName: string;
  dateOfBirth: string;
  zodiac: string;
  description: string;
};

const LoveInfo = ({
  name,
  nickName,
  dateOfBirth,
  zodiac,
  description
}: LoveInfoProps) => {
  const { color } = React.useContext(MainPageContext);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn("text-2xl font-medium text-black", "max-sm:text-xs")}
        style={{
          color: color?.white || undefined
        }}
      >
        {name}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "text-xl text-black-80 opacity-80",
            "max-sm:text-[10px]"
          )}
          style={{
            color: color?.white || undefined
          }}
        >
          {nickName}
        </div>
        <div
          className={cn(
            "text-base text-black-60 opacity-60",
            "max-sm:text-[8px]"
          )}
          style={{
            color: color?.white || undefined
          }}
        >
          {format(
            dateOfBirth ? new Date(dateOfBirth) : new Date(),
            "dd/MM/yyyy"
          )}
        </div>
        <div
          className={cn(
            "text-base text-black-60 opacity-60",
            "max-sm:text-[8px]"
          )}
          style={{
            color: color?.white || undefined
          }}
        >
          {zodiac}
        </div>

        <div
          className={cn(
            "text-base text-black-60 opacity-60",
            "max-sm:text-[8px]"
          )}
          style={{
            color: color?.white || undefined
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default LoveInfo;
