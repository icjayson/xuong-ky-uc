import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
type LoveItemProps = {
  url: string | File;
};

const LoveItem = ({ url }: LoveItemProps) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>(url as string);

  React.useEffect(() => {
    if (url instanceof File) {
      setAvatarUrl(URL.createObjectURL(url));
    } else {
      setAvatarUrl(url);
    }
  }, [url]);

  return (
    <div className="flex items-center justify-center w-[116px] h-[116px]">
      <Avatar className="w-full h-full">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default LoveItem;
