import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Card from "@/components/ui/card";
import React from "react";
import { format } from "date-fns";
import { PreviewContext } from "../../admin/preview";

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
  const { color, data, colorKey } = React.useContext(PreviewContext);

  const diaryCardBackground = () => {
    return colorKey !== "custom"
      ? color?.secondary1
      : color?.primary || undefined;
  };

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
        backgroundColor: diaryCardBackground()
      }}
      onClick={onClick}
    >
      <div className={cn("w-full")}>
        {isEditMode ? (
          <div className="w-full h-full rounded-sm bg-black opacity-40 aspect-square"></div>
        ) : (
          <Avatar squareBorder className={cn("w-full h-full rounded-sm")}>
            <AvatarImage src={image_url} className="object-cover" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        )}
      </div>

      {!isEditMode ? (
        <div className="flex flex-col gap-1">
          <div>
            <div
              className={cn(
                "text-2xl text-black font-medium prevent-overflow-word",
                "max-sm:text-xs",
                "max-lg:text-sm",
                "max-xl:text-base"
              )}
              style={{
                color: color?.secondary3 || undefined,
                fontFamily: data?.font || undefined
              }}
            >
              {location}
            </div>
            <div
              className={cn(
                "text-base text-black-60 opacity-60 prevent-overflow-word",
                "max-sm:text-[8px]",
                "max-lg:text-[10px]",
                "max-xl:text-xs"
              )}
              style={{
                color: color?.secondary3 || undefined,
                fontFamily: data?.font || undefined
              }}
            >
              {format(new Date(memory_date || new Date()), "dd/MM/yyyy")}
            </div>
          </div>
          <div
            className={cn(
              "text-xl text-black prevent-overflow-word",
              "max-sm:text-[10px]",
              "max-lg:text-xs",
              "max-xl:text-sm"
            )}
            style={{
              color: color?.secondary3 || undefined,
              fontFamily: data?.font || undefined
            }}
          >
            &ldquo;{description}&rdquo;
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "text-2xl text-black font-medium text-center prevent-overflow-word",
            "max-sm:text-xs",
            "max-lg:text-sm",
            "max-xl:text-base"
          )}
          style={{
            color: color?.secondary3 || undefined,
            fontFamily: data?.font || undefined
          }}
        >
          Cập nhật nhật ký
        </div>
      )}
    </Card>
  );
};

export default DiaryCard;
