import React from "react";
import IncomingCard from "./incoming-card";
import { cn } from "@/lib/utils";

const clocks = [
  {
    id: 1,
    image: "/clocks/clock-1.png"
  },
  {
    id: 2,
    image: "/clocks/clock-2.png"
  },
  {
    id: 3,
    image: "/clocks/clock-3.png"
  },
  {
    id: 4,
    image: "/clocks/clock-4.png"
  },
  {
    id: 5,
    image: "/clocks/clock-5.png"
  }
];

type ClockSelectorProps = {
  value?: number;
  onSelect?: (id: number) => void;
};

const ClockSelector = ({ value, onSelect }: ClockSelectorProps) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {clocks.map((clock) => (
        <div
          key={clock.id}
          className={cn(
            "h-[74px] w-[120px] rounded-lg bg-transparent border border-primary cursor-pointer flex items-center justify-center gap-2",
            {
              "bg-primary-50": value === clock.id
            }
          )}
          onClick={() => onSelect?.(clock.id)}
        >
          <div
            className="w-full h-full bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${clock.image})` }}
          />
        </div>
      ))}

      <IncomingCard />
    </div>
  );
};

export default ClockSelector;
