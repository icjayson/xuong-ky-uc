import { PreviewContext } from "@/components/pages/admin/preview";
import { cn } from "@/lib/utils";
import React from "react";

type ClockPieceProps = {
  number: string;
  timeType: string;
};

const ClockPiece = ({ number, timeType }: ClockPieceProps) => {
  const { color } = React.useContext(PreviewContext);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-black-60 w-[52px] h-[52px] rounded-[5px] opacity-60"
      )}
      style={{
        backgroundColor: color?.secondary2 || undefined
      }}
    >
      <div
        className={cn("text-xl text-background")}
        style={{
          color: color?.primary || undefined
        }}
      >
        {number}
      </div>
      <div
        className={cn("text-white-60 text-[6px]")}
        style={{
          color: color?.black || undefined
        }}
      >
        {timeType}
      </div>
    </div>
  );
};

export default ClockPiece;
