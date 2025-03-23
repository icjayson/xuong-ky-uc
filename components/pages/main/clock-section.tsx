import ClockPiece from "@/components/ui/clock-piece";
import { cn } from "@/lib/utils";
import React from "react";

const ClockSection = () => {
  const fromDate = new Date("2025-03-22").toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 w-4/5 mx-auto bg-primary rounded-[36px] py-8 shadow-timer backdrop-timer",
        "max-sm:rounded-[10px] max-sm:py-2 max-sm:shadow-timer-small max-sm:backdrop-timer-small max-sm:gap-1"
      )}
    >
      <div
        className={cn(
          "text-[32px] text-black-80 font-medium",
          "max-sm:text-xs",
          "max-lg:text-base",
          "max-xl:text-2xl"
        )}
      >
        Đã bên nhau
      </div>

      <div>
        <div className={cn("flex gap-8", "max-sm:gap-3", "max-lg:gap-6")}>
          <ClockPiece number="2" timeType="NĂM" />
          <ClockPiece number="10" timeType="THÁNG" />
          <ClockPiece number="15" timeType="NGÀY" />
          <ClockPiece number="8" timeType="GIỜ" />
        </div>
      </div>

      <div
        className={cn(
          "text-black-80 text-xl font-medium",
          "max-sm:text-[8px]",
          "max-lg:text-xs",
          "max-xl:text-base"
        )}
      >
        Từ {fromDate}
      </div>
    </div>
  );
};

export default ClockSection;
