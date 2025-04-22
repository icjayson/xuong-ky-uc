import ClockPiece from "@/components/pages/preview/cellphone/clock-piece";
import { cn } from "@/lib/utils";
import React from "react";
import { formatDurationFrom } from "@/utils/date";
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
        "flex flex-col items-center justify-center gap-1 w-[276px] h-[101px] mx-auto bg-primary rounded-[9px] py-8 shadow-timer-small backdrop-timer"
      )}
      style={{
        backgroundColor: clockBackground()
      }}
    >
      <div
        className={cn(
          "text-xs text-black-80 font-medium text-center max-w-[85%] prevent-overflow-word"
        )}
        style={{
          color: color?.secondary3 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        {data?.title || "Đã bên nhau"}
      </div>

      <div>
        <div className={cn("flex gap-[10px]")}>
          <ClockPiece number={years.toString()} timeType="NĂM" />
          <ClockPiece number={months.toString()} timeType="THÁNG" />
          <ClockPiece number={days.toString()} timeType="NGÀY" />
          <ClockPiece number={hours.toString()} timeType="GIỜ" />
        </div>
      </div>

      <div
        className={cn("text-black-80 text-[8px] font-medium")}
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
