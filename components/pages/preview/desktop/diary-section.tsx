"use client";

import DiaryCard from "@/components/pages/preview/desktop/diary-card";
import { cn } from "@/lib/utils";
import React from "react";
import { PreviewContext } from "../../admin/preview";

const DiarySection = () => {
  const { memories, color, data, colorKey } = React.useContext(PreviewContext);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8 w-4/5 mx-auto",
        "max-sm:gap-4"
      )}
    >
      <div
        className={cn(
          "text-[32px] text-black-80 font-medium",
          "max-sm:text-base",
          "max-lg:text-lg",
          "max-xl:text-xl"
        )}
        style={{
          color:
            colorKey !== "custom"
              ? colorKey == "3"
                ? color?.secondary1
                : color?.secondary3
              : color?.secondary4 || undefined,
          fontFamily: data?.font || undefined
        }}
      >
        Nhật ký tình yêu
      </div>

      <div
        className={cn(
          "grid grid-cols-4 gap-5",
          "max-sm:gap-4 max-sm:grid-cols-2",
          "max-lg:gap-4 max-lg:grid-cols-3"
        )}
      >
        {memories.map((memory) => (
          <DiaryCard key={memory.id} {...memory} />
        ))}
      </div>
    </div>
  );
};

export default DiarySection;
