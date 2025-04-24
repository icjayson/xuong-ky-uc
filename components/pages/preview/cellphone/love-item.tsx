import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { convertImage } from "@/utils/convert-image";
import React from "react";

type LoveItemProps = {
  url: string | File;
  className?: string;
};

const LoveItem = ({ url, className }: LoveItemProps) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>(url as string);

  React.useEffect(() => {
    const fetchAvatar = async () => {
      const objectUrl = await convertImage(url);
      setAvatarUrl(objectUrl || "");
    };
    fetchAvatar();
  }, [url]);

  return (
    <div
      className={cn(
        "flex items-center justify-center w-[116px] h-[116px]",
        className
      )}
    >
      <Avatar className="w-full h-full">
        <AvatarImage src={avatarUrl} className="object-cover" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default LoveItem;
