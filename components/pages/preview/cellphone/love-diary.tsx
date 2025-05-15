"use client";

import { PreviewContext } from "@/components/pages/admin/preview";
import DiaryCard from "@/components/pages/preview/cellphone/diary-card";
import { cn } from "@/lib/utils";
import React from "react";

const DiarySection = () => {
  const { memories, color, data, colorKey } = React.useContext(PreviewContext);

  const getColorSchemeForFirstTwoDefaultColors = () => {
    if (colorKey !== "custom" && (colorKey === "1" || colorKey === "2")) {
      return color?.secondary3;
    }

    return color?.secondary4;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 w-4/5 mx-auto"
      )}
    >
      <div
        className={cn("text-base text-black-80 font-medium")}
        style={{
          color: getColorSchemeForFirstTwoDefaultColors(),
          fontFamily: data?.font || undefined,
        }}
      >
        Nhật ký tình yêu
      </div>

      <div className={cn("grid grid-cols-2 gap-3")}>
        {memories.map((memory) => (
          <DiaryCard key={memory.id} {...memory} />
        ))}
      </div>
    </div>
  );
};

export default DiarySection;
