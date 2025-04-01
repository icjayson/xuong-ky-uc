import ClockPiece from "@/components/ui/clock-piece";
import { cn } from "@/lib/utils";
import React from "react";
import { formatDurationFrom } from "@/utils/date";
import { MainPageContext } from "@/contexts/contexts";

const ClockSection = () => {
  const { data } = React.useContext(MainPageContext);

  const fromDate = new Date(
    data.start_date_of_love || new Date().toISOString()
  ).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const { years, months, days, hours } = formatDurationFrom(fromDate);
  const colorScheme = data.color_scheme;
  const color = Object.values(colorScheme || {})[0];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 w-4/5 mx-auto bg-primary rounded-[36px] py-8 shadow-timer backdrop-timer",
        "max-sm:rounded-[10px] max-sm:py-2 max-sm:shadow-timer-small max-sm:backdrop-timer-small max-sm:gap-1"
      )}
      style={{
        backgroundColor: color?.secondary1 || undefined
      }}
    >
      <div
        className={cn(
          "text-[32px] text-black-80 font-medium",
          "max-sm:text-xs",
          "max-lg:text-base",
          "max-xl:text-2xl"
        )}
        style={{
          color: color?.black || undefined
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
          color: color?.black || undefined
        }}
      >
        Từ {fromDate}
      </div>
    </div>
  );
};

export default ClockSection;
