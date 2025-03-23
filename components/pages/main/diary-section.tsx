"use client";

import DiaryCard from "@/components/ui/diary-card";
import { cn } from "@/lib/utils";
import React from "react";

type DiarySectionProps = {
  isEditMode?: boolean;
};

const DiarySection = ({ isEditMode = false }: DiarySectionProps) => {
  const diaries = [
    {
      id: 1,
      url: "https://github.com/shadcn.png",
      title: "Tên bài viết",
      date: "2025-03-22",
      description: "Mô tả bài viết"
    },
    {
      id: 2,
      url: "https://github.com/shadcn.png",
      title: "Tên bài viết",
      date: "2025-03-22",
      description: "Mô tả bài viết"
    },
    {
      id: 3,
      url: "https://github.com/shadcn.png",
      title: "Tên bài viết",
      date: "2025-03-22",
      description: "Mô tả bài viết"
    },
    {
      id: 4,
      url: "https://github.com/shadcn.png",
      title: "Tên bài viết",
      date: "2025-03-22",
      description: "Mô tả bài viết"
    },
    {
      id: 5,
      url: "https://github.com/shadcn.png",
      title: "Tên bài viết",
      date: "2025-03-22",
      description: "Mô tả bài viết"
    }
  ];

  const handleClickAddDiary = () => {
    console.log("click");
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
        {diaries.map((diary) => (
          <DiaryCard key={diary.id} {...diary} />
        ))}

        {isEditMode && (
          <DiaryCard isEditMode={isEditMode} onClick={handleClickAddDiary} />
        )}
      </div>
    </div>
  );
};

export default DiarySection;
