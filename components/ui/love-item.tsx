import { Avatar, AvatarImage } from "./avatar";

type LoveItemProps = {
  url: string;
};

const LoveItem = ({ url }: LoveItemProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Avatar className="w-full h-full">
        <AvatarImage src={url} />
      </Avatar>
    </div>
  );
};

export default LoveItem;
