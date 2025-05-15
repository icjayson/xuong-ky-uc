"use client";

import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import HeartRate from "./heart-rate";
import CrossLine from "./crossline";
import BlinkingHeart from "./blinking-heart";
import { MainPageContext } from "@/contexts/contexts";

type LoveIconProps = {
  className?: string;
  type?: number;
  isReminder?: boolean;
};

const LoveIcon = ({
  type = 1,
  className,
  isReminder = false,
}: LoveIconProps) => {
  const { color } = React.useContext(MainPageContext);

  switch (type) {
    case 1:
      return (
        <div
          className={cn(
            "flex justify-center items-center w-full h-full overflow-x-hidden",
            className
          )}
          style={{
            color: color?.secondary4 || undefined,
          }}
        >
          <BlinkingHeart isReminder={isReminder} />
        </div>
      );

    case 2:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            {
              "w-[200px] h-[80px] max-xl:w-[70px] max-xl:h-[50px]": isReminder,
            },
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
              "max-sm:w-[50px] max-sm:h-[30px]",
              {
                "max-sm:w-[70px] max-sm:h-[50px]": isReminder,
              }
            )}
          >
            <DotLottieReact src="/lotties/sandglass.lottie" autoplay loop />
          </div>
        </div>
      );

    case 3:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            {
              "w-[200px] h-[80px] max-xl:w-[70px] max-xl:h-[50px]": isReminder,
            },
            className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[128px]",
              "max-xl:hidden"
            )}
          >
            <HeartRate />
          </div>
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[80px] z-10",
              "max-sm:w-[50px] max-sm:h-[30px]",
              {
                "max-sm:w-[70px] max-sm:h-[50px]": isReminder,
              }
            )}
          >
            <DotLottieReact src="/lotties/filling-heart.lottie" autoplay loop />
          </div>
        </div>
      );

    case 4:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            {
              "w-[200px] h-[80px] max-xl:w-[70px] max-xl:h-[50px]": isReminder,
            },
            className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[128px]",
              "max-xl:hidden"
            )}
          >
            <HeartRate />
          </div>
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[80px] z-10",
              "max-sm:w-[50px] max-sm:h-[30px]",
              {
                "max-sm:w-[70px] max-sm:h-[50px]": isReminder,
              }
            )}
          >
            <DotLottieReact src="/lotties/icon-4.lottie" autoplay loop />
          </div>
        </div>
      );

    default:
      return (
        <div
          className={cn(
            "flex justify-center items-center relative w-full h-full",
            {
              "w-[200px] h-[80px] max-xl:w-[70px] max-xl:h-[50px]": isReminder,
            },
            className
          )}
        >
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[128px]",
              "max-xl:hidden"
            )}
          >
            <HeartRate />
          </div>
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[80px] z-10",
              "max-sm:w-[50px] max-sm:h-[30px]",
              {
                "max-sm:w-[70px] max-sm:h-[50px]": isReminder,
              }
            )}
          >
            <DotLottieReact src="/lotties/icon-3.lottie" autoplay loop />
          </div>
        </div>
      );
  }
};

export default LoveIcon;
