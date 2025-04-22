import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { convertImage } from "@/utils/convert-image";

type LoveItemProps = {
  url: string;
};

const LoveItem = ({ url }: LoveItemProps) => {
  const [avatarUrl, setAvatarUrl] = React.useState<string>(url as string);

  React.useEffect(() => {
    const fetchAvatar = async () => {
      const objectUrl = await convertImage(url);
      setAvatarUrl(objectUrl || "");
    };
    fetchAvatar();
  }, [url]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Avatar className="w-full h-full">
        <AvatarImage src={avatarUrl} className="object-cover" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default LoveItem;
