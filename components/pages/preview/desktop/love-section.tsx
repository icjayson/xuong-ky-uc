"use client";

import LoveIcon from "@/components/pages/preview/desktop/love-icon";
import LoveInfo from "@/components/pages/preview/desktop/love-info";
import LoveItem from "@/components/pages/preview/desktop/love-item";
import { cn } from "@/lib/utils";
import React from "react";
import { PreviewContext } from "../../admin/preview";

const LoveSection = () => {
  const { data } = React.useContext(PreviewContext);

  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-3 gap-5 w-4/5 mx-auto",
          "max-xl:grid-cols-[2fr_0.5fr_2fr]"
        )}
      >
        <LoveItem url={(data?.avatar_1_url as string) || ""} />

        <LoveIcon type={data?.clock_type ?? 1} />

        <LoveItem url={(data?.avatar_2_url as string) || ""} />

        <LoveInfo
          name={data?.person1_name ?? "Tên"}
          nickName={data?.person1_nickname ?? "Biệt danh"}
          dateOfBirth={data?.person1_dob ?? new Date().toISOString()}
          zodiac={data?.person1_zodiac ?? "Cung hoàng đạo"}
          description={data?.person1_description ?? "Mô tả"}
        />

        <div></div>

        <LoveInfo
          name={data?.person2_name ?? "Tên"}
          nickName={data?.person2_nickname ?? "Biệt danh"}
          dateOfBirth={data?.person2_dob ?? new Date().toISOString()}
          zodiac={data?.person2_zodiac ?? "Cung hoàng đạo"}
          description={data?.person2_description ?? "Mô tả"}
        />
      </div>
    </div>
  );
};

export default LoveSection;
