import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./button";
import Link from "next/link";

type NotSharingStepsProps = {
  step: number;
  description: string;
  link?: string;
  buttonText?: string;
  externalLink?: boolean;
};

const NotSharingSteps = ({
  step,
  description,
  link,
  buttonText,
  externalLink = false
}: NotSharingStepsProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-[948px] justify-between items-center border-2 border-primary shadow-info-card rounded-[8px] px-6 py-5 gap-6",
        "max-sm:py-4 max-sm:px-[10px] max-sm:border max-sm:shadow-info-card-small"
      )}
    >
      <div className={cn("flex items-center gap-8", "max-sm:gap-2")}>
        <div
          className={cn(
            "w-[50px] h-[50px] rounded-full bg-primary flex justify-center items-center text-[28px] font-medium text-black-80",
            "max-sm:w-6 max-sm:h-6 max-sm:text-xs"
          )}
        >
          {step}
        </div>
        <div
          className={cn("text-xl text-black-80 flex-wrap", "max-sm:text-[8px]")}
        >
          {description}
        </div>
      </div>

      {link && buttonText && (
        <Button
          className={cn(
            "font-medium rounded-full h-10 px-5 whitespace-nowrap",
            "max-sm:h-[26px] max-sm:text-[8px] max-sm:px-2"
          )}
        >
          <Link href={link} target={externalLink ? "_blank" : "_self"}>
            {buttonText}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default NotSharingSteps;
