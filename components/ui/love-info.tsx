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
  description,
}: LoveInfoProps) => {
  const { color, data, colorKey } = React.useContext(MainPageContext);

  const getColorSchemeForFirstTwoDefaultColors = () => {
    if (colorKey !== "custom" && (colorKey === "1" || colorKey === "2")) {
      return color?.secondary3;
    }

    return color?.secondary4;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          "text-2xl font-medium text-black text-center prevent-overflow-word",
          "max-sm:text-xs"
        )}
        style={{
          color: getColorSchemeForFirstTwoDefaultColors(),
          fontFamily: data?.font || undefined,
        }}
      >
        {name}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            "text-xl text-black-80 opacity-80 text-center prevent-overflow-word",
            "max-sm:text-[10px]"
          )}
          style={{
            color: getColorSchemeForFirstTwoDefaultColors(),
            fontFamily: data?.font || undefined,
          }}
        >
          {nickName}
        </div>
        <div
          className={cn(
            "text-base text-black-60 opacity-60 text-center prevent-overflow-word",
            "max-sm:text-[8px]"
          )}
          style={{
            color: getColorSchemeForFirstTwoDefaultColors(),
            fontFamily: data?.font || undefined,
          }}
        >
          {format(
            dateOfBirth ? new Date(dateOfBirth) : new Date(),
            "dd/MM/yyyy"
          )}
        </div>
        <div
          className={cn(
            "text-base text-black-60 opacity-60 text-center prevent-overflow-word",
            "max-sm:text-[8px]"
          )}
          style={{
            color: getColorSchemeForFirstTwoDefaultColors(),
            fontFamily: data?.font || undefined,
          }}
        >
          {zodiac}
        </div>

        <div
          className={cn(
            "text-base text-black-60 opacity-60 text-justify prevent-overflow-word",
            "max-sm:text-[8px]"
          )}
          style={{
            color: getColorSchemeForFirstTwoDefaultColors(),
            fontFamily: data?.font || undefined,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default LoveInfo;
