"use client";

import LoveIcon from "@/components/pages/preview/cellphone/love-icon";
import LoveInfo from "@/components/pages/preview/cellphone/love-info";
import LoveItem from "@/components/pages/preview/cellphone/love-item";
import { cn } from "@/lib/utils";
import React from "react";
import { PreviewContext } from "@/components/pages/admin/preview";

const LoveSection = () => {
  const { data } = React.useContext(PreviewContext);

  return (
    <div
      className={cn(
        "grid grid-cols-[2fr_0.5fr_2fr] place-items-center gap-3 mx-auto w-4/5"
      )}
    >
      <LoveItem url={data?.avatar_1_url ?? ""} />

      <LoveIcon type={data?.clock_type ?? 1} />

      <LoveItem url={data?.avatar_2_url ?? ""} />

      <LoveInfo
        name={data?.person1_name ?? ""}
        nickName={data?.person1_nickname ?? ""}
        dateOfBirth={data?.person1_dob ?? ""}
        zodiac={data?.person1_zodiac ?? ""}
        description={data?.person1_description ?? ""}
      />

      <div></div>

      <LoveInfo
        name={data?.person2_name ?? ""}
        nickName={data?.person2_nickname ?? ""}
        dateOfBirth={data?.person2_dob ?? ""}
        zodiac={data?.person2_zodiac ?? ""}
        description={data?.person2_description ?? ""}
      />
    </div>
  );
};

export default LoveSection;
