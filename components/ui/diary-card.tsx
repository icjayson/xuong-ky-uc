import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Card from "./card";
import { MainPageContext } from "@/app/(auth)/[userIdentity]/layout";
import React from "react";
type DiaryCardProps = {
  isEditMode?: boolean;
  image_url?: string;
  location?: string;
  memory_date?: string;
  description?: string;
  onClick?: () => void;
};

const DiaryCard = ({
  isEditMode = false,
  image_url,
  location,
  memory_date,
  description,
  onClick
}: DiaryCardProps) => {
  const { color } = React.useContext(MainPageContext);

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
      style={{
        backgroundColor: color?.secondary1 || "#fff"
      }}
      onClick={onClick}
    >
      <div className={cn("w-full")}>
        {isEditMode ? (
          <div className="w-full h-full rounded-sm bg-black opacity-40 aspect-square"></div>
        ) : (
          <Avatar squareBorder className={cn("w-full h-full rounded-sm")}>
            <AvatarImage src={image_url} />
            <AvatarFallback>Avatar</AvatarFallback>
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
              style={{
                color: color?.black || undefined
              }}
            >
              {location}
            </div>
            <div
              className={cn(
                "text-base text-black-60 opacity-60",
                "max-sm:text-[8px]",
                "max-lg:text-[10px]",
                "max-xl:text-xs"
              )}
              style={{
                color: color?.black || undefined
              }}
            >
              {memory_date}
            </div>
          </div>
          <div
            className={cn(
              "text-xl text-black",
              "max-sm:text-[10px]",
              "max-lg:text-xs",
              "max-xl:text-sm"
            )}
            style={{
              color: color?.black || undefined
            }}
          >
            &ldquo;{description}&rdquo;
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
          style={{
            color: color?.black || undefined
          }}
        >
          Cập nhật nhật ký
        </div>
      )}
    </Card>
  );
};

export default DiaryCard;
