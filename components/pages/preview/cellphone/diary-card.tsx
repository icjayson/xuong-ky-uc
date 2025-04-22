import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Card from "@/components/ui/card";
import { PreviewContext } from "@/components/pages/admin/preview";
import React from "react";
import { format } from "date-fns";

type DiaryCardProps = {
  image_url?: string;
  location?: string;
  memory_date?: string;
  description?: string;
  onClick?: () => void;
};

const DiaryCard = ({
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
      className={cn("w-full rounded-2xl flex flex-col gap-2")}
      style={{
        backgroundColor: diaryCardBackground()
      }}
      onClick={onClick}
    >
      <div className={cn("w-full")}>
        <Avatar squareBorder className={cn("w-full h-full rounded-sm")}>
          <AvatarImage src={image_url} className="object-cover" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <div
            className={cn(
              "text-xs text-black font-medium prevent-overflow-word"
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
              "text-[8px] text-black-60 opacity-60 prevent-overflow-word"
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
          className={cn("text-[10px] text-black prevent-overflow-word")}
          style={{
            color: color?.secondary3 || undefined,
            fontFamily: data?.font || undefined
          }}
        >
          &ldquo;{description}&rdquo;
        </div>
      </div>
    </Card>
  );
};

export default DiaryCard;
