import LoveIcon from "@/components/ui/love-icon";
import LoveItem from "@/components/ui/love-item";
import { cn } from "@/lib/utils";
import React from "react";

const LoveSection = () => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-5 w-4/5 mx-auto",
        "max-xl:grid-cols-[2fr_0.5fr_2fr]"
      )}
    >
      <LoveItem
        url="https://github.com/shadcn.png"
        name="Nguyễn Văn A"
        nickName="Biệt danh"
        dateOfBirth="2025-03-22"
        zodiac="Zodiac"
      />

      <LoveIcon />

      <LoveItem
        url="https://github.com/shadcn.png"
        name="Nguyễn Văn A"
        nickName="Biệt danh"
        dateOfBirth="2025-03-22"
        zodiac="Zodiac"
      />
    </div>
  );
};

export default LoveSection;
