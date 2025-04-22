import LockFillIcon from "../icons/lock-fill";

type MemoryFrameProps = {
  frame: string;
  name: string;
  isIncoming?: boolean;
};

const getFrameBackground = (frame: string) => {
  if (frame.startsWith("/")) {
    return {
      backgroundImage: `url(${frame})`
    };
  }

  return {
    backgroundColor: frame
  };
};

const MemoryFrame = ({ frame, name, isIncoming }: MemoryFrameProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-[132px] h-[170px] p-2 rounded-[8px]"
        style={getFrameBackground(frame)}
      >
        <div className="rounded-[4px] bg-memory-frame-background w-full aspect-square flex items-center justify-center">
          {isIncoming && (
            <div className="rounded-full flex gap-2 text-[8px] text-black">
              Sắp ra mắt <LockFillIcon size={12} />
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-black font-medium text-center">{name}</div>
    </div>
  );
};

export default MemoryFrame;
