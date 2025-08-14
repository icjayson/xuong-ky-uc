import React from "react";
import IncomingCard from "./incoming-card";
import { cn } from "@/lib/utils";

const frames = [
  {
    id: 1,
    image: "/clocks/clock-1.png",
  },
  {
    id: 2,
    image: "/clocks/clock-2.png",
  },
  {
    id: 3,
    image: "/clocks/clock-3.png",
  },
  {
    id: 4,
    image: "/clocks/clock-4.png",
  },
  {
    id: 5,
    image: "/clocks/clock-5.png",
  },
];

type FrameSelectorProps = {
  value?: number;
  onSelect?: (id: number) => void;
};

const FrameSelector = ({ value, onSelect }: FrameSelectorProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {frames.map((frame) => (
        <div
          key={frame.id}
          className={cn(
            "h-[74px] w-[120px] rounded-lg bg-transparent border border-primary cursor-pointer flex items-center justify-center gap-2",
            {
              "bg-primary-50": value === frame.id,
            }
          )}
          onClick={() => onSelect?.(frame.id)}
        >
          <div
            className="w-full h-full bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${frame.image})` }}
          />
        </div>
      ))}

      <IncomingCard />
    </div>
  );
};

export default FrameSelector;
