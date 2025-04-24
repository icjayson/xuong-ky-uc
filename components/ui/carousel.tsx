"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FramesList } from "../pages/main/photo-frame-modal";

type CarouselProps = {
  frames: FramesList[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const items = [1, 2, 3, 4, 5, 6];

export function Carousel({ frames, selectedId, onSelect }: CarouselProps) {
  return (
    <div className="w-full max-w-[524px]">
      <div className="relative">
        <div className="flex overflow-x-auto custom-scrollbar pb-1">
          {frames.map((item) => (
            <div key={item.id} className="flex-none overflow-hidden">
              <div
                className={cn(
                  "h-[215px] w-[143px] relative border-[6px] border-transparent",
                  {
                    "border-frame-border rounded-[6px]": selectedId === item.id,
                  }
                )}
                onClick={() => onSelect(item.id)}
              >
                {item.frame1.startsWith("#") ? (
                  <div
                    className="absolute z-[1] w-full h-full"
                    style={{ backgroundColor: item.frame1 }}
                  ></div>
                ) : (
                  <Image
                    src={item.frame1}
                    alt="overlay1"
                    fill
                    className="object-cover absolute z-[1]"
                  />
                )}

                {item.frame2 ? (
                  <Image
                    src={item.frame2}
                    alt="overlay2"
                    fill
                    className="object-cover absolute z-[3]"
                  />
                ) : null}

                <div className="relative grid grid-cols-2 gap-1 z-[2] px-[10.5px] pt-2 pb-[30px]">
                  {items.map((miniItem) => (
                    <div
                      key={miniItem}
                      className="w-full aspect-square bg-frame-item rounded-xs"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
