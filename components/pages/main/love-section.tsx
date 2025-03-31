"use client";

import LoveIcon from "@/components/ui/love-icon";
import LoveInfo from "@/components/ui/love-info";
import LoveItem from "@/components/ui/love-item";
import { cn } from "@/lib/utils";
import React from "react";
import { MainPageContext } from "@/app/(auth)/[userIdentity]/layout";

const LoveSection = () => {
  const { data } = React.useContext(MainPageContext);

  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-3 gap-5 w-4/5 mx-auto",
          "max-xl:grid-cols-[2fr_0.5fr_2fr]"
        )}
      >
        <LoveItem url={data.avatar_1_url ?? ""} />

        <LoveIcon type={data.clock_type ?? 1} />

        <LoveItem url={data.avatar_2_url ?? ""} />

        <LoveInfo
          name={data.person1_name ?? ""}
          nickName={data.person1_nickname ?? ""}
          dateOfBirth={data.person1_dob ?? ""}
          zodiac={data.person1_zodiac ?? ""}
          description={data.person1_description ?? ""}
        />

        <div></div>

        <LoveInfo
          name={data.person2_name ?? ""}
          nickName={data.person2_nickname ?? ""}
          dateOfBirth={data.person2_dob ?? ""}
          zodiac={data.person2_zodiac ?? ""}
          description={data.person2_description ?? ""}
        />
      </div>
    </div>
  );
};

export default LoveSection;
