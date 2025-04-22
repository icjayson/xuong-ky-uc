import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import React from "react";

type ClockPieceProps = {
  number: string;
  timeType: string;
};

const ClockPiece = ({ number, timeType }: ClockPieceProps) => {
  const { color, data, colorKey } = React.useContext(MainPageContext);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-black-60 w-[200px] h-[200px] rounded-[22px] opacity-60",
        "max-sm:w-[52px] max-sm:h-[52px] max-sm:rounded-[6px] max-sm:gap-0",
        "max-lg:w-[84px] max-lg:h-[84px] max-lg:rounded-[12px] max-lg:gap-1",
        "max-xl:w-[128px] max-xl:h-[128px] max-xl:rounded-[16px] max-xl:gap-2"
      )}
      style={{
        backgroundColor:
          colorKey !== "custom"
            ? color?.secondary2
            : color?.secondary2 || undefined
      }}
    >
      <div
        className={cn(
          "text-[64px] text-background font-semibold",
          "max-sm:text-xl",
          "max-lg:text-2xl",
          "max-xl:text-4xl"
        )}
        style={{
          color:
            colorKey !== "custom"
              ? color?.primary
              : color?.secondary1 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        {number}
      </div>
      <div
        className={cn(
          "text-white",
          "max-sm:text-[6px]",
          "max-lg:text-[8px]",
          "max-xl:text-sm"
        )}
        style={{
          color:
            colorKey !== "custom"
              ? color?.primary
              : color?.secondary1 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        {timeType}
      </div>
    </div>
  );
};

export default ClockPiece;
