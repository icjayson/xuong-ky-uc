import React from "react";
import Card from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

type DiaryCardProps = {
  isEditMode?: boolean;
  url?: string;
  title?: string;
  date?: string;
  description?: string;
  onClick?: () => void;
};

const DiaryCard = ({
  isEditMode = false,
  url,
  title,
  date,
  description,
  onClick
}: DiaryCardProps) => {
  return (
    <Card
      diary
      className={cn(
        "w-full rounded-2xl flex flex-col gap-2",
        "max-sm:rounded-[8px]",
        {
          "cursor-pointer": isEditMode
        }
      )}
      onClick={onClick}
    >
      <div className={cn("w-full")}>
        {isEditMode ? (
          <div className="w-full h-full rounded-sm bg-black opacity-40 aspect-square"></div>
        ) : (
          <Avatar squareBorder className={cn("w-full h-full rounded-sm")}>
            <AvatarImage src={url} />
          </Avatar>
        )}
      </div>

      {!isEditMode ? (
        <div className="flex flex-col gap-1">
          <div>
            <div
              className={cn(
                "text-2xl text-black font-medium",
                "max-sm:text-xs",
                "max-lg:text-sm",
                "max-xl:text-base"
              )}
            >
              {title}
            </div>
            <div
              className={cn(
                "text-base text-black-60",
                "max-sm:text-[8px]",
                "max-lg:text-[10px]",
                "max-xl:text-xs"
              )}
            >
              {date}
            </div>
          </div>
          <div
            className={cn(
              "text-xl text-black",
              "max-sm:text-[10px]",
              "max-lg:text-xs",
              "max-xl:text-sm"
            )}
          >
            "{description}"
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "text-2xl text-black font-medium text-center",
            "max-sm:text-xs",
            "max-lg:text-sm",
            "max-xl:text-base"
          )}
        >
          Cập nhật nhật ký
        </div>
      )}
    </Card>
  );
};

export default DiaryCard;
