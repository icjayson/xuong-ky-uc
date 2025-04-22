import ClockPiece from "@/components/pages/preview/desktop/clock-piece";
import { cn } from "@/lib/utils";
import { formatDurationFrom } from "@/utils/date";
import React from "react";
import { PreviewContext } from "../../admin/preview";

const ClockSection = () => {
  const { data, color, colorKey } = React.useContext(PreviewContext);

  const fromDate = new Date(
    data?.start_date_of_love || new Date().toISOString()
  ).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const { years, months, days, hours } = formatDurationFrom(fromDate);

  const clockBackground = () => {
    return colorKey !== "custom"
      ? color?.secondary1
      : color?.primary || undefined;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 w-4/5 mx-auto bg-primary rounded-[36px] py-8 shadow-timer backdrop-timer",
        "max-sm:rounded-[10px] max-sm:py-2 max-sm:shadow-timer-small max-sm:backdrop-timer-small max-sm:gap-1"
      )}
      style={{
        backgroundColor: clockBackground()
      }}
    >
      <div
        className={cn(
          "text-[32px] text-black-80 font-medium text-center max-w-[80%] prevent-overflow-word",
          "max-sm:text-xs max-sm:max-w-[70%]",
          "max-lg:text-base max-lg:max-w-[65%]",
          "max-xl:text-2xl max-xl:max-w-[75%]"
        )}
        style={{
          color: color?.secondary3 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        {data?.title || "Đã bên nhau"}
      </div>

      <div>
        <div className={cn("flex gap-8", "max-sm:gap-3", "max-lg:gap-6")}>
          <ClockPiece number={years.toString()} timeType="NĂM" />
          <ClockPiece number={months.toString()} timeType="THÁNG" />
          <ClockPiece number={days.toString()} timeType="NGÀY" />
          <ClockPiece number={hours.toString()} timeType="GIỜ" />
        </div>
      </div>

      <div
        className={cn(
          "text-black-80 text-xl font-medium",
          "max-sm:text-[8px]",
          "max-lg:text-xs",
          "max-xl:text-base"
        )}
        style={{
          color: color?.secondary3 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        Từ {fromDate}
      </div>
    </div>
  );
};

export default ClockSection;
