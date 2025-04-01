"use client";

import DiaryCard from "@/components/ui/diary-card";
import { MainPageContext } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type DiarySectionProps = {
  isEditMode?: boolean;
};

const DiarySection = ({ isEditMode = false }: DiarySectionProps) => {
  const { memories, color } = React.useContext(MainPageContext);

  const router = useRouter();

  const handleClickAddMemory = () => {
    router.push("/memory");
  };

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
          color: color?.white || undefined
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

        {isEditMode && (
          <DiaryCard isEditMode={isEditMode} onClick={handleClickAddMemory} />
        )}
      </div>
    </div>
  );
};

export default DiarySection;
