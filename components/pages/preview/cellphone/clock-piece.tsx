import { PreviewContext } from "@/components/pages/admin/preview";
import { cn } from "@/lib/utils";
import React from "react";

type ClockPieceProps = {
  number: string;
  timeType: string;
};

const ClockPiece = ({ number, timeType }: ClockPieceProps) => {
  const { color, data, colorKey } = React.useContext(PreviewContext);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-black-60 w-[52px] h-[52px] rounded-[5px]"
      )}
      style={{
        backgroundColor:
          colorKey !== "custom"
            ? color?.secondary2
            : color?.secondary2 || undefined
      }}
    >
      <div
        className={cn("text-xl text-background font-semibold")}
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
        className={cn("text-white text-[6px]")}
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
