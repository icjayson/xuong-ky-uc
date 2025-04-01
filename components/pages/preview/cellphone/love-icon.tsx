"use client";

import BlinkingHeart from "@/components/pages/preview/cellphone/blinking-heart";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LoveIconProps = {
  className?: string;
  type?: number;
};

const LoveIcon = ({ type = 1, className }: LoveIconProps) => {
  switch (type) {
    case 1:
      return (
        <div
          className={cn(
            "flex justify-center items-center w-full h-full overflow-x-hidden",
            className
          )}
        >
          <BlinkingHeart />
        </div>
      );

    case 2:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[30px] z-10"
            )}
          >
            <DotLottieReact src="/lotties/sandglass.lottie" autoplay loop />
          </div>
        </div>
      );

    default:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[30px] z-10"
            )}
          >
            <DotLottieReact src="/lotties/filling-heart.lottie" autoplay loop />
          </div>
        </div>
      );
  }
};

export default LoveIcon;
