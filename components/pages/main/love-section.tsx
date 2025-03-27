import LoveIcon from "@/components/ui/love-icon";
import LoveInfo from "@/components/ui/love-info";
import LoveItem from "@/components/ui/love-item";
import { cn } from "@/lib/utils";
import React from "react";

const person1 = {
  name: "Nguyễn Văn A",
  nickName: "Biệt danh",
  dateOfBirth: "2025-03-22",
  zodiac: "Zodiac"
};

const person2 = {
  name: "Nguyễn Văn B",
  nickName: "Biệt danh",
  dateOfBirth: "2025-03-22",
  zodiac: "Zodiac"
};

const LoveSection = () => {
  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-3 gap-5 w-4/5 mx-auto",
          "max-xl:grid-cols-[2fr_0.5fr_2fr]"
        )}
      >
        <LoveItem url="https://github.com/shadcn.png" />

        <LoveIcon />

        <LoveItem url="https://github.com/shadcn.png" />

        <LoveInfo
          name={person1.name}
          nickName={person1.nickName}
          dateOfBirth={person1.dateOfBirth}
          zodiac={person1.zodiac}
        />

        <div></div>

        <LoveInfo
          name={person2.name}
          nickName={person2.nickName}
          dateOfBirth={person2.dateOfBirth}
          zodiac={person2.zodiac}
        />
      </div>
    </div>
  );
};

export default LoveSection;
