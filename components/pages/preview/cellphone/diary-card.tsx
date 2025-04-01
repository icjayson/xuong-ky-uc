import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Card from "@/components/ui/card";
import { PreviewContext } from "@/components/pages/admin/preview";
import React from "react";
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
  const { color } = React.useContext(PreviewContext);

  return (
    <Card
      diary
      className={cn("w-full rounded-2xl flex flex-col gap-2")}
      style={{
        backgroundColor: color?.secondary1 || undefined
      }}
      onClick={onClick}
    >
      <div className={cn("w-full")}>
        <Avatar squareBorder className={cn("w-full h-full rounded-sm")}>
          <AvatarImage src={image_url} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <div
            className={cn("text-xs text-black font-medium")}
            style={{
              color: color?.black || undefined
            }}
          >
            {location}
          </div>
          <div
            className={cn("text-[8px] text-black-60 opacity-60")}
            style={{
              color: color?.black || undefined
            }}
          >
            {memory_date}
          </div>
        </div>
        <div
          className={cn("text-[10px] text-black")}
          style={{
            color: color?.black || undefined
          }}
        >
          &ldquo;{description}&rdquo;
        </div>
      </div>
    </Card>
  );
};

export default DiaryCard;
