"use client";

import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import HeartRate from "./heart-rate";
import CrossLine from "./crossline";

type LoveIconProps = {
  className?: string;
  type?: number;
};

const LoveIcon = ({ type, className }: LoveIconProps) => {
  switch (type) {
    case 1:
      return (
        <div
          className={cn(
            "flex justify-center relative w-full h-[128px] mt-[128px]",
            "max-sm:mt-0",
            "max-lg:mt-[60px]",
            className
          )}
        >
          <CrossLine
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full",
              "max-xl:hidden"
            )}
          />
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[80px] z-10",
              "max-sm:w-[50px] max-sm:h-[30px]"
            )}
          >
            <DotLottieReact src="/lotties/sandglass.lottie" autoplay loop />
          </div>
        </div>
      );
    case 2:
      return <div className={cn("flex justify-center", className)}>icon</div>;
    default:
      return (
        <div
          className={cn(
            "flex justify-center relative w-full h-[128px] mt-[128px]",
            "max-sm:mt-0",
            "max-lg:mt-[60px]",
            className
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-full",
              "max-xl:hidden"
            )}
          >
            <HeartRate />
          </div>
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[80px] z-10",
              "max-sm:w-[50px] max-sm:h-[30px]"
            )}
          >
            <DotLottieReact src="/lotties/filling-heart.lottie" autoplay loop />
          </div>
        </div>
      );
  }
};

export default LoveIcon;
