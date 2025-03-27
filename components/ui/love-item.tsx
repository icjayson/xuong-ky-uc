import { Avatar, AvatarImage } from "./avatar";

type LoveItemProps = {
  url: string;
};

const LoveItem = ({ url }: LoveItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <div className="w-full h-full">
        <Avatar className="w-full h-full">
          <AvatarImage src={url} />
        </Avatar>
      </div>
    </div>
  );
};

export default LoveItem;
